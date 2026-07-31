import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { checkRateLimit } from "@/lib/rateLimit";

function getJwtSecret(): string {
  return process.env.JWT_SECRET || "ilogitrack_jwt_default_secret_key_2026";
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    
    const rateCheck = checkRateLimit(ip, 5, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Too many registration attempts. Rate limit exceeded (5 requests/min). Please try again shortly.",
          retryAfterMs: rateCheck.resetMs,
        },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil(rateCheck.resetMs / 1000).toString() },
        }
      );
    }

    const body = await request.json();
    const { name, email, company, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const defaultFormattedName = name || (email.toLowerCase().includes("ajinkya")
      ? "Ajinkya Biradar"
      : email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()));

    const userPayload = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      email: email.toLowerCase(),
      name: defaultFormattedName,
      company: company || "Apex Logistics India Fleet",
      role: "Fleet Admin",
    };

    const token = jwt.sign(userPayload, getJwtSecret(), { expiresIn: "24h" });

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      token,
      user: userPayload,
    });

    response.cookies.set("ilogitrack_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: "Internal registration error." }, { status: 500 });
  }
}
