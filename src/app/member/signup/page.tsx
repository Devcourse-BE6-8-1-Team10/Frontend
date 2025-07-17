"use client";
import { useRouter } from "next/navigation";
import {SignupModal} from "@/src/components/features/modals/SignupModal";

export default function SignupPage() {
  const router = useRouter();

  return (
    <SignupModal
      onClose={() => router.push("/")}
      onSignupSuccess={() => router.push("/")}
    />
  );
}
