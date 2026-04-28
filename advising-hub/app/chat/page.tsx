"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { programs } from "@/lib/program-data";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi Maya. I can compare programs, check eligibility, and explain how deadlines, funding, credit, and class-year requirements affect your options.",
  },
];

function fallbackReply(input: string) {
  const lowered = input.toLowerCase();
  const target =
    programs.find((program) => lowered.includes(program.slug.replaceAll("-", " "))) ??
    (lowered.includes("marcon")
      ? programs.find((program) => program.slug === "marcon-fellows")
      : undefined) ??
    programs[0];

  return `${target.title} is a strong place to start. It is open to ${target.eligibleClassYears.join(
    ", ",
  )}, runs during ${target.periods.join(
    ", ",
  )}, and ${target.fundingTypes.length > 0 ? `offers ${target.fundingTypes.join(" and ").toLowerCase()}` : "does not currently list funding"}. ${
    target.deadline ? `The listed deadline is ${target.deadline}. ` : ""
  }Based on your profile, I would check fit around ${target.opportunityTypes
    .slice(0, 3)
    .join(", ")
    .toLowerCase()} first.`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const quickPrompts = useMemo(
    () => [
      "Am I eligible for Marcon Fellows?",
      "Show funded research programs.",
      "Compare LUSSI and Eco-Rep.",
    ],
    [],
  );

  async function sendMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, threadId }),
      });
      const payload = (await response.json()) as {
        response?: string;
        threadId?: string;
      };

      setThreadId(payload.threadId ?? threadId);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.response ?? fallbackReply(trimmed),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: fallbackReply(trimmed),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <AppShell active="chat" title="Advisor Chat">
      <section className="chat-layout">
        <div className="chat-summary">
          <p className="eyebrow">Context loaded</p>
          <h2>Programs, profile, requirements</h2>
          <p>
            The advisor uses program deadlines, eligibility, college fit,
            funding, credit, interests, and saved programs to answer.
          </p>
          <div className="chip-row">
            <span className="chip">Marcon Fellows</span>
            <span className="chip">Funding fit</span>
            <span className="chip">Class year</span>
          </div>
        </div>

        <div className="chat-panel">
          <div className="messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`message ${message.role}`} key={message.id}>
                <p>{message.content}</p>
              </div>
            ))}
            {isSending ? (
              <div className="message assistant pending">
                <p>Checking program requirements...</p>
              </div>
            ) : null}
          </div>

          <div className="quick-prompts">
            {quickPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => void sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <input
              aria-label="Message"
              placeholder="Ask about fit, deadlines, funding, credit..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" disabled={isSending || input.trim() === ""}>
              Send
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
