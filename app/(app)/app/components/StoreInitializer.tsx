'use client'
import { fetchCats, fetchMemes } from '@/app/store/actions';
import { useAppDispatch } from '@/app/store/hooks';
import React from 'react'
interface StoreInitializerProps {
  children: React.ReactNode,
}

function StoreInitializer({children}: StoreInitializerProps) {
  // const dispatch = useAppDispatch();

  // dispatch(fetchMemes());
  // dispatch(fetchCats());
  return (
    <>{children}</>
  )
}

export default StoreInitializer