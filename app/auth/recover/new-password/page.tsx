"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useTransition } from "react";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { recover } from "@/actions/authenticate";
import Link from "next/link";
import FormError from "@/app/(app)/app/components/utility/FormError";
import FormSuccess from "@/app/(app)/app/components/utility/FormSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { verificationTokenValid } from "@/actions/verificationToken";
import { RecoverSchema } from "@/schemas/RecoverSchema";

type FormFeedback = {
  isError: boolean;
  message: string;
};

function Page() {
  const [formFeedback, setFormFeedback] = useState<FormFeedback>();
  const params = useSearchParams();
  const [email, setEmail] = useState<string>();

  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RecoverSchema>>({
    resolver: zodResolver(RecoverSchema),
    defaultValues: {
      email: email,
      password: "",
      repeat_password: ""
    },
  });

  useEffect(() => {
    const emailParam = params.get("email");
    setEmail(emailParam || "")
    const token = params.get("token");
    if (!token) {
      setFormFeedback({ message: "<a className=\"text-right text-sm hover:text-primary hover:underline\" href=\"/auth/recover\">There is no token, please repeat the recovery process</a>", isError: true });
      return
    }
    const tokenValid = verificationTokenValid(emailParam || "", token)
    if (!tokenValid) {
      setFormFeedback({ message: "<a className=\"text-right text-sm hover:text-primary hover:underline\" href=\"/auth/recover\">There is no token, please repeat the recovery process</a>", isError: true });
    }
  }, [params])

  const { errors } = form.formState;

  const attemptRecovery = (e: any) => {
    console.log("attempting...")
    startTransition(async () => {
      recover(e).then((res) => {
        if (res.success) {
          console.log("success!")
          setFormFeedback({ message: res.success, isError: false });
          setTimeout(sendToLogin, 3000)
        } else if (res.error) {
          console.log("failed!")
          setFormFeedback({ message: res.error, isError: true });
        }
        console.log("dunno?")
      });
    });
  };

  const sendToLogin = () => {
    router.push("/auth/signin")
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6">
        <form onSubmit={form.handleSubmit((data) => {
          console.log("Form submitted", data);
          attemptRecovery(data);
        })}>
          <h1 className="text-2xl text-center font-bold mb-2">Recover password</h1>
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <FaEnvelope />
            <input
              disabled={isPending}
              {...form.register("email")}
              className="grow bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="label">
            <span className="label-text-alt text-red-600">
              {errors.email?.message}
            </span>
          </div>

          {/** New password */}
          <div id="newPasswords">
            <div className="label">
              <span className="label-text">New Password:</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <FaUnlockKeyhole />
              <input
                disabled={isPending}
                {...form.register("password")}
                type="password"
                className="grow bg-transparent"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-red-600">
                {errors.password?.message}
              </span>
            </div>
            <div className="label">
              <span className="label-text">Confirm New Password:</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <FaUnlockKeyhole />
              <input
                disabled={isPending}
                {...form.register("repeat_password")}
                type="password"
                className="grow bg-transparent"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-red-600">
                {errors.repeat_password?.message}
              </span>
            </div>
          </div>
          <div className="h-4"></div>
          {formFeedback &&
            (formFeedback?.isError ? (
              <FormError message={formFeedback.message} />
            ) : (
              <FormSuccess message={formFeedback.message} />
            ))}

          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary w-full"
          >
            Change password
          </button>

          <div className="flex flex-col items-start mt-2">
            <Link
              href={"/auth/signin"}
              className="text-right text-sm hover:text-primary hover:underline"
            >
              Back to Sign in
            </Link>
            <Link
              href={"/auth/signup"}
              className="text-right text-sm hover:text-primary hover:underline"
            >
              Go to Sign up
            </Link>
          </div>
        </form>
        {/* <div className="divider">OR</div>
        <GoogleSigninBtn /> */}
      </div>
    </div>
  );
}

export default Page;
