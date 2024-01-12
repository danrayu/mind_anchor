"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function SiteMainPage() {
  const router = useRouter();
  const goToApp = () => {
    router.push('/app/memes');

  }
  return (
    <div>
      <h2>
        here why my app is so awesome
      </h2>
      <button className='btn btn-primary' onClick={goToApp}> go to app </button>
    </div>
  )
}

export default SiteMainPage