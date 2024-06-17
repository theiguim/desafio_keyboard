import React, { useEffect, useState } from "react";
import "./App.css"

function App() {

  const [random, setRandom] = useState([]);
  const [showGame, setShowGame] = useState(false)
  let timer = null

  useEffect(() => {
    timer = setTimeout(() => {
      setShowGame(false)
    }, 5000);

    return () => clearTimeout(timer)

  }, [showGame])

  useEffect(()=>{
    window.addEventListener("keyup", compareF);

    return ()=>{
      window.removeEventListener("keyup", compareF)
    }
  }, [compareF])

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

    console.log(random);
    console.log(keyPressed);
    // usando array do state
    if (random[posicao] == keyPressed) {
      posicao++
      console.log(posicao)
    }

    if (random[5] == keyPressed) {
      alert("PARABÉNS!")
      setShowGame(false)
      clearTimeout(timer)
    }
  }

  return (
    <>
      <div className="container" >
        {/* <p>{showGame && random.join(" | ")}</p> */}

        <div>{showGame && random.map((item, idx)=>{
          
        return (<div key={idx} className={posicao > idx ? "posicao": ""}>{item}</div>)
        
        })}</div>
     
        <div className={showGame ? "timer" : ""}></div>

        <button onClick={genRandom} className={showGame? "btn": ""}>Iniciar</button>

      </div>
    </>
  )

}
export default App