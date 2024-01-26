"use client"
import { useAppSelector } from '@/app/store/hooks'
import React from 'react'

function MindscapeView() {

  const cats = useAppSelector(state => state.memes.memes);


  return (
    <div>MindscapeView</div>
  )
}

export default MindscapeView