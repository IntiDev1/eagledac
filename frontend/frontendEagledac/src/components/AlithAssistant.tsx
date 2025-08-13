import { useEffect, useRef, useState } from "react";
import "../styles/assistant.scss";

export default function AlithAssistant() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const ask = async () => {
    if (!prompt.trim()) return;
    const userText = prompt.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setPrompt("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/alith/generate-dac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();
      const text = data.code || data.message || data.error || "No response";
      setMessages((m) => [...m, { role: "ai", text }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Network error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="alith-fab" onClick={() => setOpen(true)}>
        🤖 Alith
      </button>

      {open && (
        <div className="alith-modal">
          <div className="alith-card">
            <div className="alith-header">
              <strong>Alith Assistant</strong>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="alith-body">
              {messages.length === 0 && (
                <div className="hint">
                  Ask me to improve your contract or generate snippets.
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="alith-footer">
              <input
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., add Ownable and a pause() function"
                onKeyDown={(e) => (e.key === "Enter" ? ask() : undefined)}
              />
              <button onClick={ask} disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
