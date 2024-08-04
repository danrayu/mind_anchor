import React from 'react'

function Footer() {
  return (
    <div className='bottom-0 relative w-full left-0 bg-black'>
      <div className='px-10 py-4 flex flex-nowrap justify-between items-center'>
        <div><span className='text-base'>@ Daniil Rayu 2024</span></div>
        <div id="footer_nav" className='w-fit flex flex-col'>
          <a href='http://localhost:3000/app'>Home</a>
          <a href='http://localhost:3000/app/memes'>Memes</a>
          <a href='http://localhost:3000/app/memes/categories'>Categories</a>
        </div>
      </div>
    </div>
  )
}

export default Footer