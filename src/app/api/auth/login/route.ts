import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { checkRateLimit } from "@/lib/rateLimit";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is missing.");
  }
  return secret;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    
    const rateCheck = checkRateLimit(ip, 5, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Too many authentication attempts. Rate limit exceeded (5 requests/min). Please try again shortly.",
          retryAfterMs: rateCheck.resetMs,
        },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil(rateCheck.resetMs / 1000).toString() },
        }
      );
    }

    const body = await request.json();
    const { email, password, name, company } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const defaultFormattedName = email.toLowerCase().includes("ajinkya")
      ? "Ajinkya Biradar"
      : email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const userPayload = {
      userId: "usr_" + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      name: name || defaultFormattedName,
      role: "Fleet Dispatcher",
      company: company || "Apex Logistics India Fleet",
    };

    const token = jwt.sign(userPayload, getJwtSecret(), { expiresIn: "24h" });

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
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
    return NextResponse.json({ error: "Internal authentication error." }, { status: 500 });
  }
}
