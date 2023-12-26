// yarn add dotenv
// chỉ lưu các giá trị ít khi thay đổi và các các giá trị bảo mật
// file nay nó nắm trong .gitignore
import dotenv from 'dotenv';
dotenv.config();

export default {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
}