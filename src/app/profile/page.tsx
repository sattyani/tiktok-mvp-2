import { logoutAction } from "@/features/auth/actions";

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <form action={logoutAction}>
        <button type="submit" className="text-sm underline">
          Log out
        </button>
      </form>
    </main>
  );
}
