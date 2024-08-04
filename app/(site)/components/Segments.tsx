import React from 'react'
interface SegmentsProps {
  children: React.ReactNode
}

function Segments({children}: SegmentsProps) {
  return (
    <div className='max-w-[600px] mx-auto mt-14'>{children}</div>
  )
}

export default Segments