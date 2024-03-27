"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { FaPerson, FaUnlockKeyhole } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { signup } from "@/actions/authenticate";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormError from "@/app/(app)/app/components/utility/FormError";
import FormSuccess from "@/app/(app)/app/components/utility/FormSuccess";

type FormFeedback = {
  isError: boolean;
  message: string;
};

function page() {
  const router = useRouter();
  const [formFeedback, setFormFeedback] = useState<FormFeedback>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { errors } = form.formState;

  const attemptSignup = (e: any) => {
    startTransition(async () => {
      signup(e).then((res) => {
        if (res.success) {
          setFormFeedback({ message: res.success, isError: false });
          setTimeout(() => {
            router.push(`/auth/validate-email?waitingFor=${res.email}`);
          }, 2000)
        } else if (res.error) {
          setFormFeedback({ message: res.error, isError: true });
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={form.handleSubmit(attemptSignup)}
        className="rounded-xl bg-base-200 p-8 pt-6 mt-6"
      >
        <h1 className="text-2xl text-center font-bold mb-2">Sign up</h1>

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
          <span className="label-text">Name</span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <FaPerson />
          <input
            disabled={isPending}
            {...form.register("name")}
            className="grow bg-transparent"
          />
        </label>
        <div className="label">
          <span className="label-text-alt text-red-600">
            {errors.name?.message}
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
          Sign up
        </button>
        <div className="h-4"></div>

        <Link href={"/auth/signin"}>Already have an account?</Link>
      </form>
    </div>
  );
}

export default page;
