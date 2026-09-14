"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import styles from "./site-chrome.module.css";

const navigation = [
  ["Về PRLM", "#ve-prlm"],
  ["Dịch vụ", "#dich-vu"],
  ["Dự án tiêu biểu", "#du-an"],
  ["Góc nhìn chuyên môn", "#goc-nhin"],
];

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");
  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeAfterSelection = false,
  ) => {
    event.preventDefault();
    if (closeAfterSelection) closeMenu();
    window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <header className={styles.header} data-site-header data-scrolled="false">
      <div className={`container ${styles.headerInner}`}>
        <Link aria-label="Paraluman, trang chủ" className={styles.logo} href="/">
          <Image
            alt="Paraluman"
            height={100}
            loading="eager"
            priority
            src="/assets/paraluman-logo-ivory.svg"
            width={540}
          />
        </Link>

        <nav aria-label="Điều hướng chính" className={styles.desktopNav}>
          {navigation.map(([label, href]) => (
            <Link href={href} key={label} onClick={(event) => scrollToSection(event, href)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <ButtonLink href="#lien-he" onClick={(event) => scrollToSection(event, "#lien-he")}>
            Đặt lịch tư vấn chiến lược
          </ButtonLink>
        </div>

        <details
          className={styles.mobileMenu}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeMenu();
          }}
          ref={menuRef}
        >
          <summary aria-label="Mở menu">Menu</summary>
          <nav aria-label="Điều hướng trên thiết bị di động">
            {navigation.map(([label, href]) => (
              <Link href={href} key={label} onClick={(event) => scrollToSection(event, href, true)}>
                {label}
              </Link>
            ))}
            <Link href="#lien-he" onClick={(event) => scrollToSection(event, "#lien-he", true)}>Đặt lịch tư vấn chiến lược</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
