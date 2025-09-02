import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret_change_me");
const alg = "HS256";

export type JwtPayload = {
  sub: string;
  email: string;
  name?: string;
};

export async function signJwt(payload: JwtPayload, expiresIn = "2h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJwt(token: string) {
  const { payload } = await jwtVerify(token, secret, { algorithms: [alg] });
  return payload as JwtPayload;
}
