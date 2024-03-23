import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
interface FormErrorProps {
  message: string;
}

function FormError({message}: FormErrorProps) {
  return (
    <div className='bg-red-700 flex items-center p-3 rounded-lg mb-2'>
      <FaExclamationTriangle className='text-red-200'/>
      <span className='text-red-200 ml-4'>{message}</span>
    </div>
  )
}

export default FormError