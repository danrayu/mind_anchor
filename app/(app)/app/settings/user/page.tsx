"use server"
import { auth } from '@/auth'
import React from 'react'
import UserForm from '../../../../auth/components/UserForm';

async function page() {
  const session = await auth();

  return (
    <div>
      Settings for user page
      <UserForm session={session!} />
    </div>
  )
}

export default page