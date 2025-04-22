"use client"

import LoginForm from '@/components/LoginForm'
import React, { useState } from 'react'

const LoginPage = () => {
  const titleText = "ArtLapus"
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <div className="flex">
      <div className="flex-1 h-screen">
        <div className="flex flex-col">
          <div className="flex align-center justify-center">
            <h1>Here is <span className="text-red-500">Welcome Page</span></h1>
          </div>
          
          <div
            className="edu-australia-font h-70 flex justify-center items-center text-6xl relative"
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {titleText.split('').map((letter, index) => (
              <span
                key={index}
                className={`
              inline-block
              transition-all duration-300 delay-${index * 50 > 150 ? 150 : index * 50}
              cursor-pointer
              ${hoveredIndex === index ? 'text-indigo-600 -translate-y-5' : ''}
            `}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {letter}
              </span>
            ))}
          </div>

          <div>
            <LoginForm />
          </div>
        </div>

      </div>



      <div className="flex-2 bg-indigo-400 h-screen"></div>

    </div>
  )
}

export default LoginPage