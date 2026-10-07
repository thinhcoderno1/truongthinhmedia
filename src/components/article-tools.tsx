"use client";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ArticleTools() {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setFallback(window.location.href);
    }
  }
  return (
    <div className="article-share">
      <span>Thấy hữu ích? Chia sẻ bài viết.</span>
      <button className="button button-outline" onClick={copy} type="button">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Đã sao chép" : "Sao chép liên kết"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Đã sao chép liên kết bài viết" : ""}
      </span>
      {fallback && (
        <label className="copy-fallback">
          Sao chép đường dẫn này:
          <input readOnly value={fallback} onFocus={(event) => event.target.select()} />
        </label>
      )}
    </div>
  );
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const article = document.getElementById("article-content");
      if (!article) return;
      const top = article.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight + 120);
      setProgress(Math.max(0, Math.min(100, ((window.scrollY - top + 120) / distance) * 100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

export function Toc({ entries }: { entries: { id: string; title: string; level: number }[] }) {
  if (!entries.length) return null;
  return (
    <details className="article-toc" open>
      <summary>
        Mục lục bài viết <ArrowUpRight size={16} />
      </summary>
      <nav aria-label="Mục lục bài viết">
        {entries.map((entry) => (
          <a key={entry.id} href={`#${entry.id}`} className={entry.level === 3 ? "toc-sub" : ""}>
            {entry.title}
          </a>
        ))}
      </nav>
    </details>
  );
}
