import type { ReactNode } from "react";

type MarkdownMessageProps = {
  content: string;
};

function renderText(text: string, keyPrefix: string): ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let linkMatch: RegExpExecArray | null;

  function pushBoldSegments(segment: string, prefix: string) {
    const boldPattern = /\*\*([^*]+)\*\*/g;
    let lastBoldIndex = 0;
    let boldMatch: RegExpExecArray | null;

    while ((boldMatch = boldPattern.exec(segment)) !== null) {
      if (boldMatch.index > lastBoldIndex) {
        nodes.push(segment.slice(lastBoldIndex, boldMatch.index));
      }
      nodes.push(<strong key={`${prefix}-bold-${boldMatch.index}`}>{boldMatch[1]}</strong>);
      lastBoldIndex = boldMatch.index + boldMatch[0].length;
    }

    if (lastBoldIndex < segment.length) {
      nodes.push(segment.slice(lastBoldIndex));
    }
  }

  while ((linkMatch = linkPattern.exec(text)) !== null) {
    if (linkMatch.index > lastIndex) {
      pushBoldSegments(text.slice(lastIndex, linkMatch.index), `${keyPrefix}-${lastIndex}`);
    }
    nodes.push(
      <a
        href={linkMatch[2]}
        key={`${keyPrefix}-link-${linkMatch.index}`}
        target="_blank"
        rel="noreferrer"
      >
        {linkMatch[1]}
      </a>,
    );
    lastIndex = linkMatch.index + linkMatch[0].length;
  }

  if (lastIndex < text.length) {
    pushBoldSegments(text.slice(lastIndex), `${keyPrefix}-${lastIndex}`);
  }

  return nodes;
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList(key: string) {
    if (listItems.length === 0) {
      return;
    }

    blocks.push(
      <ul key={key}>
        {listItems.map((item, index) => (
          <li key={`${key}-${index}`}>{renderText(item, `${key}-${index}`)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList(`list-${index}`);
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      listItems.push(bullet[1]);
      return;
    }

    flushList(`list-${index}`);

    if (line.startsWith("### ")) {
      blocks.push(<h4 key={index}>{renderText(line.slice(4), `h4-${index}`)}</h4>);
    } else if (line.startsWith("## ")) {
      blocks.push(<h3 key={index}>{renderText(line.slice(3), `h3-${index}`)}</h3>);
    } else if (line.startsWith("# ")) {
      blocks.push(<h2 key={index}>{renderText(line.slice(2), `h2-${index}`)}</h2>);
    } else {
      blocks.push(<p key={index}>{renderText(line, `p-${index}`)}</p>);
    }
  });

  flushList("list-final");

  return <div className="markdown-message">{blocks}</div>;
}

