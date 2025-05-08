import React from 'react'

function Button({children,
  
  bgColor="bg-blue-600",
  textColor = "text-white",
    className = "",
    ...props
  
}) {
  return (
    <div>
      <button className={`{bgColor} {textColor} {type}`} {...props}>{children}</button>
    </div>
  )
}

export default Button
