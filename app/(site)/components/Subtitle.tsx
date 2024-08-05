import React from 'react'

interface SubtitleProps {
  children: React.ReactNode
}

function Subtitle(props: SubtitleProps) {
  return (
    <div>
      <h3 className='text-2xl text-center font-light text-gray-200'>{props.children}</h3>
    </div>
  )
}

export default Subtitle