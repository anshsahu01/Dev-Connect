import React from 'react'

function Button({children,
  
  
    className = "",
    ...props
  
}) {
  return (
    <div>
      <button className='bg-blue-500 text-white p-2 font-bold rounded-xl hover:bg-blue-600' {...props}>{children}</button>
    </div>
  )
}

export default Button
