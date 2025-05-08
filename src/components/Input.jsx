import React,{useId} from 'react'

function Input({
    label,
    type="text",
    className="",
    ...props
},ref) {

    const Id=useId();
  return (

    <div className="mb-4">
    {label && (
      <label
        className="block text-gray-700 text-sm font-semibold mb-1 pl-1"
        htmlFor={Id}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      ref={ref}
      id={Id}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  </div>
   
      
 
  )
}

export default Input
