import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [random, setRandom] = useState([]);
  const [showGame, setShowGame] = useState(false)
  const [posicao, setPosicao] = useState(0)
  const [err, setErrr] = useState(null)
  let timer = null

  let globalArray = []

  useEffect(() => {
    
    if (showGame) {
      
      timer = setTimeout(() => {
        setShowGame(false)
        
      }, 5000);
    }

    return () => clearTimeout(timer)

  }, [showGame])

  useEffect(() => {
    if(showGame){
      window.addEventListener("keyup", compareF);
    }

    return () => {
      window.removeEventListener("keyup", compareF);
    }
  }, [compareF])

  function genRandom() {

    const randomIt = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    const splitRandomIt = randomIt.split(",");

    globalArray = []

    for (let i = 0; i < 6; i++) {

      const randomPosition = splitRandomIt[Math.floor(Math.random() * 25)];
      globalArray.push(randomPosition);
    }
    setRandom(globalArray);
    setShowGame(true);
    setPosicao(0);
    setErrr(null);
  }

  function compareF(e) {
    const keyPressed = e.key.toUpperCase();

    // usando array do state
    if (random[posicao] === keyPressed) {
      setPosicao(posicao + 1)
      console.log(posicao)

    } else if (random[posicao] != keyPressed) {
      setErrr(posicao)
    }

    if (posicao >= 5 && random[5] === keyPressed) {

      setTimeout(() => {
        alert("PARABÉNS!");
        setErrr(null)
        setPosicao(0)
        setShowGame(false)
        clearTimeout(timer)
      }, 200)
    }
  }

  return (
    <>
      <div className="container" >
        <div>{showGame && random.map((item, idx) => {

          return (<div key={idx} className={posicao > idx ? "letters posicao" : "letters" && err === idx ? "letters clasErr" : "letters"}>{item}</div>)

        })}</div>

        <div className={showGame ? "timer" : ""}></div>

        <button onClick={genRandom} className={showGame ? "btn" : ""}>Iniciar</button>

      </div>
    </>
  )

}
export default App
