import React,{useId} from 'react'

function Input({
    label,
    type="text",
    className="",
    ...props
},ref) {

    const Id=useId();
  return (



  <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={Id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={Id}
        ref={ref}
        className={`border border-blue-600 p-2 rounded-xl ${className}`}
        {...props}
      />
    </div>
   
      
 
  )
}

export default Input
