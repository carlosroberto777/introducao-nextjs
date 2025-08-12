
'use client'
import { useState } from "react";

interface countProps {
    initial: number
}


export default function Counter(props: countProps) {
  const [count, setCount] = useState(props.initial);

  return (
    <div className="flex justify-center">
        <h1 className="bg-green-500 px-4 py-4 rounded m-1.5 text-center ">Contagem: {count}</h1>     
        <button onClick={()=> setCount(count + 1)}
        className="bg-red-600 text-center rounded m-1.5 px-4 py-2 hover:bg-red-700">
            Incrimentar
            </button>
         <button onClick={()=> setCount(count - 1)}
        className="bg-blue-600 text-center rounded m-1.5 px-4 py-2 hover:bg-blue-700">
            Decrementar
            </button>    
    </div>
  )

}
