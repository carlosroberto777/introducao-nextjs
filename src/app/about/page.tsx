import Counter from "@/components/Counter"
import EffectCounter from "@/components/EffectCounter"
import NavBar from "@/components/NavBar"

export default function About(){

    return(
        <div>
            {/* <NavBar label1="Produtos" label2="Adminitradores" label3="Time"/>
            <h1>Sobre nós</h1>
            <p>Informações sobre a empresa ...</p> */}

            {/* <Counter initial={0}/> */}

            <EffectCounter></EffectCounter>
        </div>
    )
}