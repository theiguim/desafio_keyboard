import React, { useEffect, useState } from "react";
import "./App.css"

function App() {

  const [random, setRandom] = useState([]);
  const [showGame, setShowGame] = useState(false)
  const [posicao, setPosicao] = useState(0)
  let timer = null


  let globalArray = []

  useEffect(() => {
    timer = setTimeout(() => {
      setShowGame(false)
    }, 5000);

    return () => clearTimeout(timer)

  }, [showGame])

  useEffect(() => {
    window.addEventListener("keyup", compareF);

    return () => {
      window.removeEventListener("keyup", compareF)
    }
  }, [compareF])



  function genRandom() {

    const randomIt = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    const splitRandomIt = randomIt.split(",");

    for (let i = 0; i < 6; i++) {

      const randomPosition = splitRandomIt[Math.floor(Math.random() * 25)];
      globalArray.push(randomPosition);
    }
    setRandom(globalArray)
    setShowGame(true)
    setPosicao(0)
  }

  function compareF(e) {




    const keyPressed = e.key.toUpperCase();

    console.log(random);
    console.log(keyPressed);
    // usando array do state
    if (random[posicao] == keyPressed) {
      setPosicao(posicao + 1)
      console.log(posicao)
    }

    if (random[5] == keyPressed) {
      
      setTimeout(()=>{
        alert("PARABÉNS!");
        setShowGame(false)
        clearTimeout(timer)
        setPosicao(0)
      }, 200)
     

     
    }
  }

  return (
    <>
      <div className="container" >
        <div>{showGame && random.map((item, idx) => {

          return (<div key={idx} className={posicao > idx ? "letters posicao" : "letters"}>{item}</div>)

        })}</div>

        <div className={showGame ? "timer" : ""}></div>

        <button onClick={genRandom} className={showGame ? "btn" : ""}>Iniciar</button>

      </div>
    </>
  )

}
export default App
