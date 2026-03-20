"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "./queries";
import { getSession } from "@/lib/session";

export type RegisterState = {
  errors: {
    email?: string;
    password?: string;
    dateOfBirth?: string;
    form?: string;
  };
  values: {
    email: string;
    password: string;
    dateOfBirth: string;
  };
};

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";
  const dateOfBirth = (formData.get("dateOfBirth") as string) ?? "";

  const values = { email, password, dateOfBirth };
  const errors: RegisterState["errors"] = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 13) {
      errors.dateOfBirth = "You must be at least 13 years old to register.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return {
      errors: { email: "An account with this email already exists." },
      values,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ email, passwordHash, dateOfBirth: new Date(dateOfBirth) });

  redirect("/register/success");
}

export type LoginState = {
  error: string;
  email: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!email || !password) {
    return { error: "Invalid email or password.", email };
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return { error: "Invalid email or password.", email };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { error: "Invalid email or password.", email };
  }

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  redirect("/feed");
}
