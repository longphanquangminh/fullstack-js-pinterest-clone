BE project: Dùng Bun runtime FE project (Ionic React): Dùng npm và ionic (để dùng ionic cli có thể install global hoặc chạy npx ionic => ở đây em cài global)

DB em dùng Oracle [free edition]:

- Tải image về: `docker pull container-registry.oracle.com/database/free:latest` (có thể dùng image Oracle khác để nhẹ hơn nhưng có thể cấu hình sẽ khác và khó khăn hơn)
- Cấu hình và chạy container dựa trên image Oracle: như video, ở đây em cấu hình va` run bằng thao tác chuột trên Docker Desktop, có thể chạy lệnh docker cli như docker run nhưng maybe sẽ khó khăn hơn

Chạy project:

- BE: bun start:dev (chạy MT dev): localhost: 8080
- FE: ionic serve: localhost:8100

Thông tin DB:

- Mặc định DB_NAME của oracle bản free tên là "free"
- Mặc định DB_PORT của oracle bản free tên là 1521
- Mặc định DB_HOST của oracle bản free tên là localhost
- Mặc định DB_USER của oracle bản free tên là system
- PASSWORD nên để là 1234 (env ORACLE_PWD) Project tập trung chủ yếu vào Back-end (Express, TypeScript, TypeORM), em làm thêm FE (folder photo-gallery) chủ yếu để nâng cao trình độ và sẵn kiểm tra BE có chạy ổn hay ko ====================== BE em có generate ra swagger nhưng có thể ko hđ tốt!
