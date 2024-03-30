"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function GoToAppButton() {
  const router = useRouter();
  const onClick = () => {
    router.push("/app");
  }
  return (
    <button className='btn btn-lg btn-wide btn-outline border-2 text-white ' onClick={onClick}>Try it out</button>
  )
}

export default GoToAppButton