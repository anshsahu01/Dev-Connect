import React,{useId} from 'react'

function Input({
    label,
    type="text",
    className="",
    ...props
},ref) {

    const Id=useId();
  return (

  //   <div className="mb-4">
  //   {label && (
  //     <label
  //       className="block mb-1 text-sm font-medium text-gray-700"
  //       htmlFor={Id}
  //     >
  //       {label}
  //     </label>
  //   )}
  //   <input
  //     type={type}
  //     ref={ref}
  //     id={Id}
  //     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
  //     {...props}
  //   />
  // </div>

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
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out ${className}`}
        {...props}
      />
    </div>
   
      
 
  )
}

export default Input
