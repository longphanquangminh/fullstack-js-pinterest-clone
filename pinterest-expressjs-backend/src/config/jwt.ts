import * as jwt from "jsonwebtoken";

export const createToken = data => {
  const token = jwt.sign({ data }, "BIMAT", { algorithm: "HS256" });

  return token;
};

export const checkToken = token => jwt.verify(token, "BIMAT", (error, decoded) => error);

export const createRefToken = data => {
  const token = jwt.sign({ data }, "KO_BIMAT", { algorithm: "HS256", expiresIn: "7d" });

  return token;
};

export const checkRefToken = token => jwt.verify(token, "KO_BIMAT", (error, decoded) => error);

export const decodeToken = token => {
  return jwt.decode(token);
};

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;

  const check = checkToken(token);

  if (check == null) {
    // check token hợp lệ
    next();
  } else {
    // token không hợp lệ
    res.status(401).send("token không hợp lệ");
  }
};
