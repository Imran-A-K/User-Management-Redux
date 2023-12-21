import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Navbar from "@/components/Navbar/Navbar";

export default function UserLayout({ children }) {
  return (
    <AuthGuard>
      <main className="flex flex-col min-h-screen w-full">
        <Navbar />
        {children}
      </main>
    </AuthGuard>
  );
}
