"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
  const router = useRouter();

  const gotToApp = () => {
    router.push('/app');
  }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-base-200 p-8 pt-6 mt-6 flex items-center flex-col space-y-6">
        <span className="text-lg">Validation successful!</span>
        <button className='btn btn-primary w-full' onClick={gotToApp}>Go to sign in</button>
      </div>
    </div>
  );
}

export default page