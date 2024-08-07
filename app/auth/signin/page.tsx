"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/LoginSchema";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { signin } from "@/actions/authenticate";
import Link from "next/link";
import FormError from "@/app/(app)/app/components/utility/FormError";
import FormSuccess from "@/app/(app)/app/components/utility/FormSuccess";

type FormFeedback = {
  isError: boolean;
  message: string;
};

function Page() {
  "use client";
  const [formFeedback, setFormFeedback] = useState<FormFeedback>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const attemptLogin = (e: any) => {
    startTransition(async () => {
      signin(e).then((res) => {
        if (res.success) {
          setFormFeedback({ message: res.success, isError: false });
        } else if (res.error) {
          setFormFeedback({ message: res.error, isError: true });
        }

        if (res.awaitingVerification) {
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6">
        <form onSubmit={form.handleSubmit(attemptLogin)}>
          <h1 className="text-2xl text-center font-bold mb-2">Sign in</h1>
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <FaEnvelope />
            <input
              disabled={isPending}
              {...form.register("email")}
              className="grow bg-transparent"
            />
          </label>
          <div className="label">
            <span className="label-text-alt text-red-600">
              {errors.email?.message}
            </span>
          </div>
          <div className="label">
            <span className="label-text">Password</span>
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
            Sign in
          </button>
          <div className="h-2"></div>
          <div className="flex flex-col items-start">
            <Link href={"/auth/signup"} className="text-right text-sm hover:text-primary hover:underline">
              Don&apos;t have an account yet?
            </Link>
            <Link href={"/auth/recover"} className="text-right text-sm hover:text-primary hover:underline">
              Forgot your password?
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
