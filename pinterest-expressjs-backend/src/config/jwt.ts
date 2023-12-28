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
  return jwt.decode(token, { json: true });
};

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;

  try {
    // Try to verify the token
    jwt.verify(token, "BIMAT");

    // Token is valid, move to the next middleware
    next();
  } catch (error) {
    // Token is invalid
    res.status(401).send(error.name);
  }
};
