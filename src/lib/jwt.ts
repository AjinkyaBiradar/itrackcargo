import { SignJWT, jwtVerify } from "jose";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is not set. Please define JWT_SECRET in environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface UserPayload {
  userId: string;
  email: string;
  name: string;
  company?: string;
}

export async function signJWT(payload: UserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecret());
}

export async function verifyJWT(token: string): Promise<UserPayload | null> {
  try {
    const verified = await jwtVerify(token, getJwtSecret());
    return verified.payload as unknown as UserPayload;
  } catch (error) {
    return null;
  }
}
