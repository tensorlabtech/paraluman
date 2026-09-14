import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowUpRightIcon } from "./arrow-up-right-icon";
import styles from "./button-link.module.css";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  tone?: "light" | "dark" | "text";
};

export function ButtonLink({ children, href, onClick, tone = "light" }: ButtonLinkProps) {
  return (
    <Link className={`${styles.button} ${styles[tone]}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span aria-hidden="true" className={styles.arrow}>
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}
