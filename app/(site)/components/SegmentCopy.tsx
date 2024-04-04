import React from 'react'
interface SegmentCopyProps {
  text: string;
  textStyling?: string
}

function SegmentCopy({text, textStyling = ""}: SegmentCopyProps) {
  return (
      <p className={textStyling}>{text}</p>
  )
}

export default SegmentCopy