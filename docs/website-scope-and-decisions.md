# Website scope and decisions

## Mục tiêu

Paraluman đang tái định vị từ advertising agency thành Brand Strategy & Communications Consulting Firm. Website phải ưu tiên độ tin cậy, chiều sâu tư vấn, thought leadership và lead phù hợp; ngôn ngữ thị giác là Quiet Luxury, ấm và có tính editorial.

Nguồn yêu cầu đầy đủ là [Website Design Brief v2](../original-docs/20260913000000-paraluman-website-design-brief-v2.docx); [bản Markdown](../original-docs/20260913000000-paraluman-website-design-brief-v2.md) dùng để đọc và tìm kiếm. Khi brief khác với phản hồi mới nhất đã được Thái xác nhận, dùng phản hồi mới nhất và cập nhật tài liệu này.

## Phase 1 hiện tại

- Hoàn thiện homepage tiếng Việt dạng static/mock ở mức đủ tốt để gửi khách hàng duyệt UI/UX và nội dung.
- Giữ các khối homepage do brief quy định; không thêm section mới chỉ để kéo dài trang.
- Dùng mock có ghi chú rõ cho case study, số liệu, logo và nội dung chưa được PRLM duyệt.
- Chưa triển khai backend, CMS, form lead hoặc đa ngôn ngữ trong bản giao diện hiện tại.

Homepage được sở hữu bởi [`src/components/paraluman-home/`](../src/components/paraluman-home/) và route [`src/app/page.tsx`](../src/app/page.tsx). Không chép lại cấu trúc component vào tài liệu này.

## Hướng backend khi triển khai

- Deployment target: Vercel.
- Email giao dịch/notification: Resend.
- Lead cần được lưu trong hệ thống trước khi gửi email; không bắt buộc phụ thuộc CRM ngoài ngay từ đầu.
- Database và CMS cụ thể chưa được chốt. Kiến trúc cần giữ khả năng migrate khi backend hoặc self-hosting mở rộng.

## Ranh giới nội dung và asset

- Copy cuối cùng, case study, số liệu và quyền công bố logo cần PRLM duyệt.
- `original-docs/` giữ tài liệu nguyên bản bất biến.
- `docs/` giữ quyết định và phạm vi hiện hành.
- `assets/source/` giữ brand asset nguyên bản; `public/assets/` chỉ chứa asset đã tối ưu để website sử dụng.

## Điểm còn mở

- Phạm vi trang con ngoài homepage trong lần triển khai đầu tiên.
- Nhà cung cấp database/CMS và schema lead.
- Nội dung thật thay cho toàn bộ mock.
- Lộ trình EN và các ngôn ngữ Phase 2.
