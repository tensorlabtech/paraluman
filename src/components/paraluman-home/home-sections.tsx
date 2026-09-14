import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right-icon";
import {
  caseStudyMocks,
  insightDrafts,
  proofMocks,
  services,
  verticals,
} from "./home-data";
import { ProcessTimeline } from "./process-timeline";
import styles from "./home-sections.module.css";

const manifesto = "Không chỉ làm truyền thông mà quan tâm đến việc phần brand strategy sẽ liên quan tới chiến lược kinh doanh và vận hành như thế nào để ra được doanh thu ổn định.";

const partnerLogos = [
  ["Samsung", "/assets/partner-logos/samsung.svg"],
  ["Nike", "/assets/partner-logos/nike.svg"],
  ["Unilever", "/assets/partner-logos/unilever.svg"],
  ["Apple", "/assets/partner-logos/apple.svg"],
  ["Adidas", "/assets/partner-logos/adidas.svg"],
  ["Google", "/assets/partner-logos/google.svg"],
  ["Spotify", "/assets/partner-logos/spotify.svg"],
  ["Coca-Cola", "/assets/partner-logos/cocacola.svg"],
  ["Toyota", "/assets/partner-logos/toyota.svg"],
  ["Intel", "/assets/partner-logos/intel.svg"],
];

export function HomeSections() {
  return (
    <>
      <section className={styles.manifesto} data-manifesto id="ve-prlm">
        <div aria-hidden="true" className={styles.manifestoArt} data-manifesto-art>
          <Image alt="" fill sizes="100vw" src="/assets/cover-1.webp" />
        </div>
        <div className={`container ${styles.manifestoStage}`} data-manifesto-stage>
          <div className={styles.manifestoRail} aria-hidden="true">
            <span>01 / 03</span>
            <i data-manifesto-progress />
            <span>Tư duy</span>
          </div>
          <p aria-label={manifesto} className={styles.manifestoCopy}>
            {manifesto.split(" ").map((word, index) => (
              <span aria-hidden="true" data-manifesto-word key={`${word}-${index}`}>{word}</span>
            ))}
          </p>
          <p className={styles.scriptNote} data-script-note>Chẩn đoán sâu. Tư vấn có căn cứ.</p>
        </div>
      </section>

      <section className={styles.services} data-services-story id="dich-vu">
        <div className={`container ${styles.servicesStage}`} data-services-stage>
          <header className={styles.servicesIntro}>
            <span className={styles.sectionNumber}>02</span>
            <p>Paraluman không bán các đầu việc rời rạc.</p>
            <h2>Một hành trình từ chiến lược đến năng lực tăng trưởng.</h2>
          </header>
          <div className={styles.serviceStoryCards} data-service-cards>
            {services.map((service, index) => (
              <article className={styles.serviceStoryCard} data-service-card key={service.title}>
                <Image
                  alt=""
                  className={styles.serviceStoryImage}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 900px) 100vw, 52vw"
                  src={verticals[index].image}
                />
                <div className={styles.serviceStoryOverlay} />
                <div className={styles.serviceStoryMeta}>
                  <span>Chapter {String(index + 1).padStart(2, "0")}</span>
                  <span>{index === 0 ? "Define" : index === 1 ? "Enable" : "Amplify"}</span>
                </div>
                <div className={styles.serviceStoryContent} data-service-content>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.serviceProgress} aria-hidden="true">
            <span>Strategy</span>
            <i><b data-services-progress /></i>
            <span>Growth</span>
          </div>
        </div>
      </section>

      <section className={styles.verticals} data-reveal-section>
        <div className="container">
          <SectionHeading
            description="Ba bối cảnh khác nhau, cùng một yêu cầu: đổi mới, quốc tế hóa và làm thương hiệu bài bản."
            number="03"
            title="Ba mảng trọng tâm"
          />
          <div className={styles.verticalGrid}>
            {verticals.map((vertical, index) => (
              <article className={styles.verticalCard} data-vertical-card key={vertical.title}>
                <div className={styles.verticalMedia} data-image-reveal>
                  <div className={styles.verticalImageScale}>
                    <Image
                      alt={`Hình ảnh concept cho ngành ${vertical.title}`}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      src={vertical.image}
                    />
                  </div>
                </div>
                <span className={styles.verticalIndex} data-vertical-card-copy>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.verticalReveal} data-vertical-card-copy>
                  <div className={styles.verticalContent}>
                    <span className={styles.verticalEyebrow}>{vertical.eyebrow}</span>
                    <h3>{vertical.title}</h3>
                    <p>{vertical.description}</p>
                    <Link className={styles.more} href="#lien-he">
                      Trao đổi định hướng <ArrowUpRightIcon />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection} data-process-section>
        <div className={`container ${styles.processStage}`} data-process-stage>
          <SectionHeading
            description="Mỗi bước trả lời một câu hỏi kinh doanh trước khi đi đến truyền thông."
            number="04"
            title="Quy trình hợp tác"
          />
          <ProcessTimeline />
          <div className={styles.processProgress} aria-hidden="true">
            <span>01</span>
            <i><b data-process-progress /></i>
            <span>05</span>
          </div>
        </div>
      </section>

      <section className={styles.proof} data-proof>
        <svg
          aria-hidden="true"
          className={styles.proofSignal}
          data-proof-signal
          preserveAspectRatio="none"
          viewBox="0 0 720 260"
        >
          <defs>
            <linearGradient id="proof-area-gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="60" y2="260">
              <stop offset="0" stopColor="var(--color-burgundy)" stopOpacity="0.56" />
              <stop offset="1" stopColor="var(--color-burgundy-deep)" stopOpacity="0.12" />
            </linearGradient>
            <clipPath id="proof-area-clip">
              <rect data-proof-area-reveal height="260" width="720" x="0" y="0" />
            </clipPath>
          </defs>
          <path
            clipPath="url(#proof-area-clip)"
            d="M6 226C114 224 132 168 222 173s101 34 170-29 101-82 166-49 80-44 156-80L714 260H6Z"
            fill="url(#proof-area-gradient)"
          />
        </svg>
        <div className={`container ${styles.proofInner}`}>
          <div>
            <span className={styles.sectionNumber}>05</span>
            <h2 data-proof-title>
              <span>Bằng chứng,</span>
              <span>không phải lời hứa.</span>
            </h2>
          </div>
          <div className={styles.proofStatement} data-proof-stats>
            {proofMocks.map((item) => (
              <article data-proof-stat key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
            <p>Số liệu minh họa bố cục, sẽ thay bằng dữ liệu có nguồn và bối cảnh đo lường.</p>
          </div>
        </div>
      </section>

      <section className={styles.intelligence} data-reveal-section>
        <div aria-hidden="true" className={styles.intelligencePattern} data-intelligence-pattern />
        <div className="container">
          <SectionHeading
            description="Công việc đã làm và quan điểm chuyên môn được trình bày như tài liệu tư vấn."
            number="06"
            title="Dự án & Góc nhìn"
          />

          <div className={styles.projects} id="du-an">
            <div className={styles.subheading}>
              <h3>Dự án tiêu biểu</h3>
              <span>Case concept · Không phải thành tích công bố</span>
            </div>
            <div className={styles.projectGrid} data-project-grid>
              {caseStudyMocks.map((project) => (
                <article className={styles.projectCard} data-project-card key={project.title}>
                  <div className={styles.projectVisual} data-image-reveal>
                    <div className={styles.projectImageScale}>
                      <Image
                        alt=""
                        fill
                        sizes="(max-width: 760px) 100vw, 33vw"
                        src={project.image}
                      />
                    </div>
                  </div>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.insights} id="goc-nhin">
            <div className={styles.subheading}>
              <h3>Góc nhìn chuyên môn</h3>
              <span>Chủ đề đề xuất cho bản mock</span>
            </div>
            <div className={styles.insightList} data-insight-list>
              {insightDrafts.map((insight, index) => (
                <article data-insight-row key={insight.title}>
                  <div aria-hidden="true" className={styles.insightPreview}>
                    <Image alt="" fill sizes="260px" src={verticals[index].image} />
                  </div>
                  <p>Insight · {insight.category}</p>
                  <h3>{insight.title}</h3>
                  <span>{insight.readingTime} ↗</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Khu vực logo đối tác đang chờ dữ liệu được duyệt" className={styles.ticker} data-partners>
        <div className={styles.tickerLabel}>
          <p>Đối tác &amp; khách hàng</p>
          <span>Logo minh họa bố cục · không hàm ý quan hệ hợp tác.</span>
        </div>
        <div aria-hidden="true" className={styles.partnerMarquee} data-partner-marquee>
          <span>SELECTED COLLABORATIONS · VIETNAM TO GLOBAL · </span>
          <span>SELECTED COLLABORATIONS · VIETNAM TO GLOBAL · </span>
        </div>
        <div className={`container ${styles.partnerSlots}`}>
          {partnerLogos.map(([name, logo]) => (
            <div key={name}>
              <Image alt={`${name}, logo minh họa bố cục`} height={72} src={logo} width={156} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type SectionHeadingProps = {
  description: string;
  number: string;
  title: string;
};

function SectionHeading({ description, number, title }: SectionHeadingProps) {
  return (
    <header className={styles.sectionHeading} data-section-heading>
      <span className={styles.sectionNumber}>{number}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
