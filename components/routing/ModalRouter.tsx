"use client";
import { usePathname, useRouter } from "next/navigation";
import { LoginModal } from "@/components/features/LoginModal";

export default function ModalRouter() {
  const pathname = usePathname();
  const router = useRouter();

  // Login
  if (pathname === "/login") {
    return (
      <LoginModal
        onClose={() => router.push("/")}
        onLoginSuccess={() => router.push("/")}
      />
    );
  }

  return null;
}
