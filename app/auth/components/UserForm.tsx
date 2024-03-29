"use client";
import { Session } from "next-auth";
import React, { FormEvent } from "react";
import { FaPortrait } from "react-icons/fa";

interface UserFormProps {
  session: Session;
}

function UserForm({ session }: UserFormProps) {
  const onSubmit = (event: FormEvent) => {};

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <FaPortrait />
          <input type="text" className="grow" placeholder="Username" />
        </label>
        
      </form>
    </div>
  );
}

export default UserForm;
