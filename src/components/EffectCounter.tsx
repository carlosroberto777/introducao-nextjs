'use client'

import { useEffect, useState } from "react"


export default function EffectCounter() {

    const [count, setCount] = useState(0);

    useEffect(()=>{
        alert("Contagem executou!")
        document.title = count.toString()
    }, [count])

    return (
        <div className="text-center p-10">
            <h1>Contagem: {count}</h1>
            <button onClick={()=>{setCount(count+1)}} className="bg-amber-100 rounded p-2 m-2 hover:bg-amber-200">Incrementar</button>
            <button onClick={()=>{setCount(0)}} className="bg-blue-200 rounded p-2 m-2 hover:bg-blue-300">Resetar</button>
        </div>
    )

}