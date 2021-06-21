import jwt from "jsonwebtoken";
import fs from "fs";

function createToken(data) {
  const key = fs.readFileSync("./utils/key.pem");

  return jwt.sign({ data: data }, key, {
    algorithm: "RS256",
    expiresIn: "12h",
  });
}

function validateToken(token) {
  const cert = fs.readFileSync("./utils/cert.pem");

  return jwt.verify(token, cert);
}

export default { createToken, validateToken };
