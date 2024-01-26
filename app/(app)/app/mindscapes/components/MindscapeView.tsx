"use client"
import { useAppSelector } from '@/app/store/hooks'

interface MindscapeViewProps {
  mindscape: Mindscape;
}

function MindscapeView({mindscape}: MindscapeViewProps) {

  return (
    <div>{JSON.stringify(mindscape)}</div>
  )
}

export default MindscapeView