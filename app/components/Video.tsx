type Props={
    id:string
}

import React from 'react'

const Video = ({id}:Props) => {
  return (
    <div className='aspect-w-16 aspect-h-9'>
        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="Youtube Video Player"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"
        />
    </div>
  )
}

export default Video