import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Model the two separate mobile viewports: the keyboard can shrink and pan
// the visible area while the layout viewport and document stay the same size.
function browser({ mobile = true, scrollY = 0, visualViewport = true } = {}) {
  class Element extends EventTarget {
    style = {
      overflow: "", position: "", top: "", left: "", width: "",
      overscrollBehavior: "", scrollBehavior: "",
      setProperty(name, value) { this[name] = value; },
      removeProperty(name) { delete this[name]; },
    };
    attributes = new Set();
    children = [];
    parent = null;
    editable = false;
    scrollTop = 0;
    bounds = { top: 0, bottom: 812 };
    append(child) { child.parent = this; this.children.push(child); return child; }
    contains(element) { return element === this || this.children.some(child => child.contains(element)); }
    matches() { return this.editable; }
    toggleAttribute(name, on) { if (on) this.attributes.add(name); else this.attributes.delete(name); }
    removeAttribute(name) { this.attributes.delete(name); }
    closest() { return this.attributes.has("data-mobile-scroll") ? this : this.parent?.closest(); }
    querySelector() { return this.children.find(child => child.attributes.has("data-mobile-scroll-footer")); }
    getBoundingClientRect() {
      const offset = this.editable ? this.closest()?.scrollTop ?? 0 : 0;
      return { top: this.bounds.top - offset, bottom: this.bounds.bottom - offset };
    }
  }

  const viewport = Object.assign(new EventTarget(), { height: 812, offsetTop: 0, scale: 1 });
  const media = Object.assign(new EventTarget(), { matches: mobile });
  const window = Object.assign(new EventTarget(), {
    innerHeight: 812, scrollX: 0, scrollY,
    visualViewport: visualViewport ? viewport : null,
    matchMedia: () => media,
    scrollTo({ left = 0, top = 0 }) { this.scrollX = left; this.scrollY = top; },
  });
  const document = { body: new Element(), documentElement: new Element(), activeElement: null };
  let nextFrame = 0;
  const frames = new Map();
  const context = vm.createContext({
    window, document, HTMLElement: Element,
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  function load(file, dependencies = {}) {
    const { outputText } = ts.transpileModule(readFileSync(new URL(`../lib/${file}.ts`, import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    const loaded = { exports: {} };
    const compiled = vm.runInContext(`(function(require, module, exports) { ${outputText}\n})`, context);
    compiled(name => {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected import: ${name}`);
    }, loaded, loaded.exports);
    return loaded.exports;
  }
  const scrollLock = load("document-scroll-lock");
  const { observeMobileViewport } = load("use-mobile-viewport", {
    react: {}, "@/lib/document-scroll-lock": scrollLock,
  });
  return {
    Element, window, document, viewport, media, observeMobileViewport, ...scrollLock,
    flush() { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); },
    emit(target, name) { target.dispatchEvent(new Event(name)); },
    focus(root, input) { document.activeElement = input; root.dispatchEvent(new Event("focusin")); },
  };
}

test("chat input contains keyboard resize and browser pan, then restores normal page scrolling", () => {
  const b = browser();
  const shell = new b.Element();
  const input = shell.append(new b.Element());
  input.editable = true;
  const stop = b.observeMobileViewport(shell, true);
  b.focus(shell, input);
  assert.equal(b.document.body.style.position, "fixed");
  assert.equal(b.document.documentElement.style.overflow, "hidden");
  assert.ok(shell.attributes.has("data-mobile-input-active"));

  b.viewport.height = 342;
  b.viewport.offsetTop = 126;
  b.emit(b.viewport, "resize");
  b.emit(b.viewport, "scroll");
  b.flush();
  assert.equal(shell.style["--mobile-viewport-height"], "342px");
  assert.equal(shell.style["--mobile-viewport-top"], "126px");
  b.window.scrollY = 180;
  b.emit(b.window, "scroll");
  assert.equal(b.window.scrollY, 0, "native focus cannot scroll the document");

  b.document.activeElement = null;
  b.emit(shell, "focusout");
  b.flush();
  assert.equal(b.document.body.style.position, "");
  assert.equal(b.document.documentElement.style.overflow, "");
  b.window.scrollY = 90;
  b.emit(b.window, "scroll");
  assert.equal(b.window.scrollY, 90, "the footer remains reachable when the composer is not focused");
  stop();
});

test("profile keyboard reveals a lower field inside the form above its sticky actions", () => {
  const b = browser({ scrollY: 640 });
  const unlock = b.lockDocumentScroll(true);
  const dialog = new b.Element();
  const pane = dialog.append(new b.Element());
  pane.attributes.add("data-mobile-scroll");
  pane.bounds = { top: 12, bottom: 330 };
  const footer = pane.append(new b.Element());
  footer.attributes.add("data-mobile-scroll-footer");
  footer.bounds = { top: 260, bottom: 330 };
  const input = pane.append(new b.Element());
  input.editable = true;
  input.bounds = { top: 600, bottom: 644 };
  b.viewport.height = 342;
  const stop = b.observeMobileViewport(dialog);
  b.focus(dialog, input);
  assert.equal(input.getBoundingClientRect().bottom, 248);
  assert.equal(pane.scrollTop, 396);
  assert.equal(b.window.scrollY, 0);

  // Typing and manual scrolling don't trigger repeated focus alignment.
  pane.scrollTop = 420;
  b.emit(pane, "scroll");
  b.flush();
  assert.equal(pane.scrollTop, 420);
  stop();
  unlock();
  assert.equal(b.window.scrollY, 640, "closing the modal restores the original profile-page position");
});

test("nested dialogs keep the document locked until the last owner releases it", () => {
  const b = browser({ scrollY: 480 });
  b.document.body.style.width = "98%";
  b.document.documentElement.style.scrollBehavior = "smooth";
  const releaseChat = b.lockDocumentScroll(true);
  const releaseModal = b.lockDocumentScroll(true);
  releaseChat();
  assert.equal(b.document.body.style.position, "fixed");
  assert.equal(b.window.scrollY, 0);
  releaseModal();
  assert.equal(b.document.body.style.width, "98%");
  assert.equal(b.document.documentElement.style.scrollBehavior, "smooth");
  assert.equal(b.window.scrollY, 480);
  releaseModal();
  assert.equal(b.window.scrollY, 480);
});

test("moving focus between fields keeps the lock and reveals fields above the scroll position", () => {
  const b = browser();
  const dialog = new b.Element();
  const pane = dialog.append(new b.Element());
  pane.attributes.add("data-mobile-scroll");
  pane.bounds = { top: 12, bottom: 330 };
  pane.scrollTop = 400;
  const input = pane.append(new b.Element());
  input.editable = true;
  input.bounds = { top: 140, bottom: 184 };
  const otherInput = pane.append(new b.Element());
  otherInput.editable = true;
  otherInput.bounds = { top: 204, bottom: 248 };
  const stop = b.observeMobileViewport(dialog, true);
  b.focus(dialog, input);
  assert.equal(input.getBoundingClientRect().top, 76, "field clears the close button");
  b.document.activeElement = null;
  b.emit(dialog, "focusout");
  b.focus(dialog, otherInput);
  b.flush();
  assert.equal(b.document.body.style.position, "fixed");
  stop();
  assert.equal(b.document.body.style.position, "");
});

test("desktop dialogs retain the original overflow-only lock without fixing the page", () => {
  const b = browser({ mobile: false, scrollY: 220 });
  const unlock = b.lockDocumentScroll(false);
  assert.equal(b.document.body.style.overflow, "hidden");
  assert.equal(b.document.body.style.position, "");
  assert.equal(b.document.documentElement.style.overflow, "");
  assert.equal(b.window.scrollY, 220);
  unlock();
  assert.equal(b.document.body.style.overflow, "");
});

test("desktop input is unaffected and switching to desktop releases a mobile lock", () => {
  const b = browser({ mobile: false, scrollY: 120 });
  const shell = new b.Element();
  const input = shell.append(new b.Element());
  input.editable = true;
  const stop = b.observeMobileViewport(shell, true);
  b.focus(shell, input);
  assert.equal(b.document.body.style.position, "");
  assert.equal(b.window.scrollY, 120);
  assert.equal(shell.style["--mobile-viewport-height"], undefined);
  b.media.matches = true;
  b.emit(b.media, "change"); b.flush();
  assert.equal(b.document.body.style.position, "fixed");
  b.media.matches = false;
  b.emit(b.media, "change"); b.flush();
  assert.equal(b.document.body.style.position, "");
  assert.equal(b.window.scrollY, 120);
  assert.equal(shell.attributes.has("data-mobile-input-active"), false);
  stop();
});

test("pinch zoom is preserved and unmount cleans up a focused viewport", () => {
  const b = browser();
  const shell = new b.Element();
  const input = shell.append(new b.Element());
  input.editable = true;
  const stop = b.observeMobileViewport(shell, true);
  b.focus(shell, input);
  b.viewport.scale = 2;
  b.viewport.height = 180;
  b.emit(b.viewport, "resize"); b.flush();
  b.window.scrollY = 60;
  b.emit(b.window, "scroll");
  assert.equal(b.window.scrollY, 60);
  assert.equal(shell.style["--mobile-viewport-height"], "812px");
  stop();
  assert.equal(b.document.body.style.position, "");
  b.emit(b.viewport, "resize"); b.flush();
  assert.equal(shell.style["--mobile-viewport-height"], undefined);
});

test("browsers without VisualViewport use the resized window height", () => {
  const b = browser({ visualViewport: false });
  const shell = new b.Element();
  const stop = b.observeMobileViewport(shell, true);
  b.window.innerHeight = 360;
  b.emit(b.window, "resize"); b.flush();
  assert.equal(shell.style["--mobile-viewport-height"], "360px");
  stop();
});
