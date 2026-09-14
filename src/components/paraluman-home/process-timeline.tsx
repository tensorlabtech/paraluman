import Image from "next/image";
import type { CSSProperties } from "react";
import { processSteps } from "./home-data";
import styles from "./home-sections.module.css";

export function ProcessTimeline() {
  const images = [
    "/assets/industry-real-estate.webp",
    "/assets/industry-beauty.webp",
    "/assets/industry-agriculture.webp",
  ];

  return (
    <ol className={styles.process} data-process>
      {processSteps.map((step, index) => (
        <li data-process-step key={step} style={{ "--step-index": index } as CSSProperties}>
          <div className={styles.processMedia}>
            <Image alt="" fill sizes="(max-width: 900px) 100vw, 42vw" src={images[index % images.length]} />
            <span>0{index + 1}</span>
          </div>
          <div className={styles.processCopy}>
            <small>Giai đoạn {index + 1}</small>
            <strong>{step}</strong>
            <p>{[
              "Nhìn thẳng vào bài toán kinh doanh trước khi nói về truyền thông.",
              "Xác lập giá trị, khác biệt và vai trò thương hiệu trong tăng trưởng.",
              "Chuyển chiến lược thành ưu tiên thị trường và hệ điểm chạm.",
              "Thiết kế cách con người và AI cùng biến chiến lược thành hành động.",
              "Đưa hệ thống vào vận hành, đo lường và tối ưu theo dữ liệu.",
            ][index]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
