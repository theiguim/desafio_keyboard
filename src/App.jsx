import React, { useEffect, useState } from "react";
import "./App.css"

function App() {

  const [random, setRandom] = useState([]);
  const [showGame, setShowGame] = useState(false)

  useEffect(()=>{
    const  timer = setTimeout(()=>{
      setShowGame(false)
    }, 5000);

    return ()=> clearTimeout(timer)

  }, [showGame])

  let globalArray = []
  let posicao = 0

  function genRandom() {

    const randomIt = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    const splitRandomIt = randomIt.split(",");

    for (let i = 0; i < 6; i++) {

      const randomPosition = splitRandomIt[Math.floor(Math.random() * 25)];
      globalArray.push(randomPosition);
    }
    setRandom(globalArray)
    setShowGame(true)
  }

  function compareF(e) {

   const keyPressed = e.key.toUpperCase();
   console.log(random)
   console.log(keyPressed)

// usando array do state
   if(random[posicao] == keyPressed){
    posicao++
   }else{
    alert("Você errou!")
   }

   if(random[5]==keyPressed){
    alert("PARABÉNS!")
   }
  }

  return (
    <>
      <div className="container" onKeyUp={compareF}>
        <p>{showGame && random.join(" | ")}</p>
        <div className={showGame? "timer": ""}></div>
        <button onClick={genRandom}>Iniciar</button>

      </div>
    </>
  )

}
export default App