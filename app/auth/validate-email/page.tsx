"use client";
import { getIsEmailVerified } from "@/actions/emailVerified";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("waitingFor");
  const [isWaiting, setIsWaiting] = useState(true);

  const checkValidationStatus = async () => {
    const isValid = await getIsEmailVerified(email!);
    if (isValid) {
      setIsWaiting(false);
      setTimeout(() => router.push("/app"), 2 * 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkValidationStatus, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6 flex items-center flex-col space-y-6">
        {isWaiting && (
          <>
            <span className="text-lg">
              Waiting for you to verify your email...
            </span>
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </>
        )}
        {!isWaiting && (
          <>
            <span className="text-lg">
              Success! Redirecting you to login P...
            </span>
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
