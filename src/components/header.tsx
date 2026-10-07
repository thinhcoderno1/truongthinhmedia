"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { Brand } from "./brand";

const links = [
  { label: "Trang chủ", href: "/" },
  { label: "Bài viết", href: "/bai-viet" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        dialog.current?.showModal();
        input.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  function openSearch() {
    setOpen(false);
    dialog.current?.showModal();
    input.current?.focus();
  }
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={openSearch}
              aria-label="Mở tìm kiếm"
            >
              <Search size={20} />
            </button>
            <Link href="/lien-he" className="contact-link">
              Kết nối <ArrowUpRight size={17} />
            </Link>
            <button
              type="button"
              className="icon-button menu-button"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav container"
            aria-label="Điều hướng trên điện thoại"
          >
            {[...links, { label: "Kết nối", href: "/lien-he" }].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="search-dialog-inner">
          <div className="dialog-heading">
            <h2 id="search-title">Bạn muốn đọc về điều gì?</h2>
            <button
              className="icon-button"
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Đóng tìm kiếm"
            >
              <X size={22} />
            </button>
          </div>
          <form
            action="/tim-kiem"
            onSubmit={() => {
              dialog.current?.close();
              setOpen(false);
            }}
            className="search-form"
          >
            <Search size={22} aria-hidden="true" />
            <label className="sr-only" htmlFor="header-search">
              Từ khóa tìm kiếm
            </label>
            <input
              ref={input}
              id="header-search"
              name="q"
              type="search"
              placeholder="Content, SEO, AI…"
              maxLength={120}
              required
            />
            <button className="button button-primary" type="submit">
              Tìm kiếm <ArrowUpRight size={18} />
            </button>
          </form>
          <p className="search-hint">Thử một chủ đề hoặc một câu hỏi bạn đang quan tâm.</p>
        </div>
      </dialog>
    </>
  );
}
