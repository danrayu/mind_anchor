import React from 'react'
interface SegmentTitleInterface {
  text: string
}

function SegmentTitle({text}: SegmentTitleInterface) {
  return (
    <div className='text-center'>
      <h1 className='text-4xl text-white font-semibold line-h leading-[1.2em]'>{text}</h1>
    </div>
  )
}

export default SegmentTitle