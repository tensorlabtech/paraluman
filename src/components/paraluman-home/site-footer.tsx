import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import styles from "./site-chrome.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-footer id="lien-he">
      <div aria-hidden="true" className={styles.footerOrb} data-footer-orb>
        <Image alt="" fill sizes="(max-width: 760px) 70vw, 44vw" src="/assets/paraluman-mark.png" />
      </div>
      <div className={`container ${styles.footerLead}`}>
        <p className={styles.script} data-footer-script>Một chiến lược có chiều sâu</p>
        <h2 aria-label="Đưa thương hiệu tiến về phía trước." data-footer-title>
          {"Đưa thương hiệu tiến về phía trước.".split(" ").map((word) => <span key={word}>{word}</span>)}
        </h2>
        <div className={styles.footerActions}>
          <ButtonLink href="mailto:hello@paraluman.vn?subject=T%C6%B0%20v%E1%BA%A5n%20chi%E1%BA%BFn%20l%C6%B0%E1%BB%A3c">
            Gửi yêu cầu tư vấn
          </ButtonLink>
          <a href="tel:+84911109085">0911 109 085</a>
        </div>
      </div>
      <div className={`container ${styles.footerBottom}`}>
        <Image
          alt="Paraluman"
          height={100}
          src="/assets/paraluman-logo-ivory.svg"
          width={540}
        />
        <nav aria-label="Điều hướng cuối trang">
          <Link href="#ve-prlm">Về PRLM</Link>
          <Link href="mailto:hello@paraluman.vn">hello@paraluman.vn</Link>
          <span>Chính sách bảo mật</span>
          <span>Điều khoản dịch vụ</span>
        </nav>
        <p>
          Paraluman cam kết bảo mật 100% dữ liệu chẩn đoán và thông tin mô hình kinh doanh của doanh nghiệp theo quy chuẩn NDA.
        </p>
      </div>
    </footer>
  );
}
