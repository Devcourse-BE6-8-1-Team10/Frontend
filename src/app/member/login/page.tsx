"use client";
import { useRouter } from "next/navigation";
import {LoginModal} from "@/src/components/features/modals/LoginModal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginModal
      onClose={() => router.push("/")}
      onLoginSuccess={() => router.push("/")}
    />
  );
}
