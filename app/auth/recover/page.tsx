"use client";
import { getIsEmailVerified } from "@/actions/emailVerified";
import { generateVerificationToken } from "@/actions/verificationToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { userExists } from "@/actions/getFromDB";
import { sendRecoveryEmail } from "@/actions/authEmails";

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const emailParam = params.get("email");
  const [isWaiting, setIsWaiting] = useState(true);
  const [email, setEmail] = useState<string>(emailParam || "");
  const [actionFeedback, setActionFeedback] = useState<{
    success: boolean;
    message: string;
  }>();

  const sendVerificationEmail = async () => {
    const userExistsvar = await userExists(email);
    if (!userExistsvar) {
      setActionFeedback({
        success: false,
        message: "A user with this email does not exist.",
      });
      return;
    }
    const token = await generateVerificationToken(email);
    await sendRecoveryEmail(token.token, email);

    setIsWaiting(true);
    setActionFeedback({ success: true, message: "Email sent." });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6 flex items-center flex-col space-y-6">
        <div>
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <FaEnvelope />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="grow bg-transparent"
            />
          </label>
        </div>
        <button
          onClick={sendVerificationEmail}
          className="btn btn-primary w-full"
        >
          Send Recovery Email
        </button>
        <div className="label">
          {actionFeedback?.success && (
            <span className="label-text-alt text-green-600">
              {actionFeedback?.message}
            </span>
          )}
          {!actionFeedback?.success && (
            <span className="label-text-alt text-red-600">
              {actionFeedback?.message}
            </span>
          )}
        </div>

        {isWaiting && (
          <>
            <span className="text-sm">
              Check your inbox for a recovery email. You may close this page.
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
