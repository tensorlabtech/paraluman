import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { TextMagnifier } from "./text-magnifier";
import styles from "./site-chrome.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-hero>
      <div className={styles.heroMedia} data-hero-media>
        <Image
          alt="Không gian nhận diện Paraluman"
          className={styles.heroImage}
          data-hero-image
          fill
          priority
          sizes="100vw"
          src="/assets/hero-cover-hq.webp"
          unoptimized
        />
      </div>
      <div aria-hidden="true" className={styles.heroCurtain} data-hero-curtain>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.heroWash} data-hero-wash />
      <div className={`container ${styles.heroInner}`} data-hero-inner>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker} data-hero-kicker><span>Vietnam to Global</span></p>
          <div data-hero-title>
            <TextMagnifier as="h1" variant="hero">
              Brand strategy chỉ có giá trị khi chuyển hoá thành tăng trưởng bền vững.
            </TextMagnifier>
          </div>
          <p className={styles.heroDescription} data-hero-description>
            Paraluman kết nối chiến lược thương hiệu với mô hình kinh doanh, vận hành và doanh thu ổn định.
          </p>
          <div data-hero-cta>
            <ButtonLink href="#lien-he">Đặt lịch tư vấn chiến lược</ButtonLink>
          </div>
        </div>

        <div className={styles.caseNoteShell} data-case-note-shell>
          <aside className={styles.caseNote} data-case-note>
            <div className={styles.caseNoteTop}>
              <p>Case framework · Demo</p>
              <span>01 / 03</span>
            </div>
            <strong>Business → Brand → Growth</strong>
            <div aria-hidden="true" className={styles.caseRoute}>
              <i><b /></i><i><b /></i><i><b /></i>
            </div>
            <span>Một hệ logic đi từ bài toán kinh doanh đến kết quả đo lường.</span>
          </aside>
        </div>
      </div>
    </section>
  );
}
