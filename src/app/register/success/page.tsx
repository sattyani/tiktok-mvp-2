export default function RegisterSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Account created!</h1>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully.
        </p>
        <a
          href="/login"
          className="inline-block bg-black text-white rounded px-6 py-2 text-sm font-medium"
        >
          Log in
        </a>
      </div>
    </main>
  );
}
