import jwt from "jsonwebtoken";
import fs from "fs";

function createToken(data, permanent) {
  const key = fs.readFileSync("./utils/key.pem");
  let duration;

  if (permanent) {
    duration = '4380h'
  } else {
    duration = '6h';
  }

  return jwt.sign({ data: data }, key, {
    algorithm: "RS256",
    expiresIn: duration,
  });
}

function validateToken(token) {
  const cert = fs.readFileSync("./utils/cert.pem");

  return jwt.verify(token, cert);
}

export default { createToken, validateToken };
