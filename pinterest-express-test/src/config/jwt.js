// yarn add jsonwebtoken
// 1. mã hóa dữ liệu
// 2. kiểm tra token hợp lệ
// 3. giải token

import jwt from 'jsonwebtoken';

export const createToken = (data) => {
    let token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256", expiresIn: "3s" });

    return token;
}

export const checkToken = (token) => jwt.verify(token, "BIMAT", (error, decoded) => error
);


export const createRefToken = (data) => {
    let token = jwt.sign({ data }, "KO_BIMAT", { algorithm: "HS256", expiresIn: "7d" });

    return token;
}

export const checkRefToken = (token) => jwt.verify(token, "KO_BIMAT", (error, decoded) => error
);

export const decodeToken = (token) => {
    return jwt.decode(token);
}

export const verifyToken = (req, res, next) => {

    let { token } = req.headers;

    let check = checkToken(token);

    if (check == null) {
        // check token hợp lệ
        next()
    } else {
        // token không hợp lệ
        res.status(401).send(check.name)
    }


}