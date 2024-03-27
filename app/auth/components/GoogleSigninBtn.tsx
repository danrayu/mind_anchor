"use client"
import { signIn } from 'next-auth/react';
import React from 'react'
import { FaGoogle } from 'react-icons/fa';

interface GoogleSigninBtnProps {
  wrapperClass?: string;
  btnClass?: string;
}

function GoogleSigninBtn({wrapperClass, btnClass}: GoogleSigninBtnProps) {
  const onSignIn = async () => {
    await signIn("google");
  }

  return (
    <div className={wrapperClass + ' w-full'}>
      <button className={'btn btn-primary flex space-x-2 items-center w-full ' + btnClass} onClick={onSignIn}>
        <FaGoogle />
        <span>Sign in with Google</span>
      </button>
    </div>
  )
}

export default GoogleSigninBtn