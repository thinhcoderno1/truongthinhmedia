import sanitizeHtml from "sanitize-html";
import { decode } from "html-entities";

export function plainText(value: string): string {
  return decode(sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }))
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function prepareContent(raw: string) {
  const toc: { id: string; title: string; level: number }[] = [];
  const ids = new Map<string, number>();
  // Sanitization precedes heading extraction; CMS scripts, events and unsafe URLs are discarded.
  let html = sanitizeHtml(raw, {
    allowedTags: [
      "p",
      "br",
      "hr",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "figure",
      "figcaption",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "div",
      "span",
      "details",
      "summary",
      "sup",
      "sub",
    ],
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      ol: ["start"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attrs) => ({
        tagName,
        attribs: { ...attrs, ...(attrs.target === "_blank" ? { rel: "noopener noreferrer" } : {}) },
      }),
      img: (tagName, attrs) => ({
        tagName,
        attribs: { ...attrs, alt: attrs.alt || "", loading: "lazy", decoding: "async" },
      }),
    },
  });
  html = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g,
    (_, tag: string, attrs: string, inner: string) => {
      const title = plainText(inner);
      const base =
        normalizeText(title)
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "muc";
      const count = (ids.get(base) || 0) + 1;
      ids.set(base, count);
      const id = count > 1 ? `${base}-${count}` : base;
      toc.push({ id, title, level: tag === "h2" ? 2 : 3 });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );
  return { html, toc };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
