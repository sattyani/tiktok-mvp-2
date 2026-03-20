"use client";

import { useActionState } from "react";
import { loginAction, LoginState } from "../actions";

const initialState: LoginState = {
  error: "",
  email: "",
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.email}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white rounded py-2 text-sm font-medium disabled:opacity-50"
      >
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
