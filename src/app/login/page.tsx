import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
        <LoginForm />
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline">
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
