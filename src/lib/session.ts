import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  userId?: string;
};

const sessionOptions: SessionOptions = {
  cookieName: "tiktok_mvp_session",
  password: "complex_password_at_least_32_characters_long_for_iron_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
