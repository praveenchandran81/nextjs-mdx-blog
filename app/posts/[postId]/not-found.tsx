import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center'>
      <p className='mt-10'>Sorry, the requested post does'nt exist</p>
      <Link href='/'> ◀️ Back to home</Link>
    </div>
  )
}

export default NotFound