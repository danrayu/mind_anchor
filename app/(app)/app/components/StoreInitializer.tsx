'use client'
import React from 'react'
import { useDispatch } from 'react-redux'
interface StoreInitializerProps {
  memes: Meme[],
  categories: Category[],
  children: React.ReactNode,
}

function StoreInitializer({memes, categories, children}: StoreInitializerProps) {
  const dispatch = useDispatch();
  dispatch({ type: 'SET_MEMES', payload: memes });
  dispatch({ type: 'SET_CATS', payload: categories });

  return (
    <>{children}</>
  )
}

export default StoreInitializer