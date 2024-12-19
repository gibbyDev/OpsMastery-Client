'use client';
import { Footer } from "@/components/common/Footer";
// import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth(); // This will redirect to signin if not authenticated

  return (
    <div className="min-h-screen bg-slate-900">
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
} 