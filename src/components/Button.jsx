import React from 'react'

function Button({children,
  
  
    className = "",
    ...props
  
}) {
  return (
    <div>
      <button className='bg-stone-700  w-32 h-12 text-white p-2 font-bold rounded-xl hover:bg-blue-600 sm:w-30 ' {...props}>{children}</button>
    </div>
  )
}

export default Button
