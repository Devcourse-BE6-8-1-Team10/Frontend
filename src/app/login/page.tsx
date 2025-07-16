"use client";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/features/LoginModal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginModal
      onClose={() => router.push("/")}
      onLoginSuccess={() => router.push("/")}
    />
  );
}
