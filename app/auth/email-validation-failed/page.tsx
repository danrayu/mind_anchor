"use client";
import { generateVerificationToken } from "@/actions/verificationToken";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const error = params.get("error");
  const [isPending, startTransition] = useTransition();

  let errorMsg;
  switch (error) {
    case "409":
      errorMsg = "Email does not require validation.";
      break;
    case "408":
      errorMsg = "Token expired. Please try again.";
      break;
    case "400":
      errorMsg = "Token does not match. Please try again.";
      break;
    case "500":
      errorMsg = "Something went wrong. Please try again.";
      break;
    default:
      errorMsg = "Something went wrong. Please try again.";
      break;
  }

  const resendValidationEmail = async () => {
    if (email) {
      startTransition(async () => {
        await generateVerificationToken(email);
        router.push(`/auth/validate-email?waitingFor=${email}`);
      });
    } else {
      router.push("/auth/signup");
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6 flex items-center flex-col space-y-6">
        <span className="text-3xl text-white font-bold">
          Validation failed...{" "}
        </span>
        <span className="text-lg text-error">{errorMsg}</span>
        <button
          className="btn btn-primary w-full"
          onClick={resendValidationEmail}
          disabled={isPending}
        >
          Resend validation email
        </button>
        {isPending && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
      </div>
    </div>
  );
}

export default Page;
