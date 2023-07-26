import Image from 'next/image'
import React from 'react'

const MyProfilePic = () => {
  return (
    <section className='w-full mx-auto'>

        <Image
            className='border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8'
            src="/images/Praveen_PP1.JPG"
            width={200}
            height={200}
            alt="Praveen"
            priority={true}
        />
    </section>
  )
}

export default MyProfilePic