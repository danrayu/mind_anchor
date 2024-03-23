import React from 'react'
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
interface FormErrorProps {
  message: string;
}

function FormSuccess({message}: FormErrorProps) {
  return (
    <div className='bg-green-700 flex items-center p-3 rounded-lg mb-2'>
      <FaCheck className='text-green-200'/>
      <span className='text-green-200 ml-4'>{message}</span>
    </div>
  )
}

export default FormSuccess