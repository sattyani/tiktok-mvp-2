"use client";

import { useActionState } from "react";
import { registerAction, RegisterState } from "../actions";

const initialState: RegisterState = {
  errors: {},
  values: { email: "", password: "", dateOfBirth: "" },
};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.values.email}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {state.errors.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue={state.values.password}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {state.errors.password && (
          <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          defaultValue={state.values.dateOfBirth}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {state.errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">{state.errors.dateOfBirth}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white rounded py-2 text-sm font-medium disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
