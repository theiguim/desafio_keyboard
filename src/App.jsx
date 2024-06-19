import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "./App.css";

const defaultConfig = {
  time: 10000,
  countLetters: 6,
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const App = () => {
  const lettersRef = useRef([]);

  const [config, setConfig] = useState(defaultConfig);
  const [letters, setLetters] = useState([]);
  const [inGame, setInGame] = useState(false);
  const [position, setPosition] = useState(0);

  const intervalRef = useRef(null);

  const generateLetters = () => {
    return Array.from({ length: config.countLetters }, () => {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet[randomIndex];
    });
  };

  const startGame = () => {
    setLetters(generateLetters());

    setInGame(true);
  };

  const resetGame = () => {
    setInGame(false);
    setPosition(0);
  };

  const renderLetter = useCallback(
    (letter, index) => {
      return (
        <span
          key={letter}
          ref={(el) => (lettersRef.current[index] = el)}
          className={`letter ${
            index === position
              ? "letter--selected"
              : index < position
              ? "letter--correct"
              : ""
          }`}
          onAnimationEnd={(event) => {
            if (event.animationName === "pulseError")
              event.target.classList.remove("letter--error");
          }}
        >
          {letter.toUpperCase()}
        </span>
      );
    },
    [position]
  );

  const renderLetters = useMemo(() => {
    return letters.map(renderLetter);
  }, [letters, renderLetter]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === letters[position]) {
        setPosition((prev) => prev + 1);
      } else {
        const letterRef = lettersRef.current[position];
        letterRef.classList.remove("letter--error");
        letterRef.classList.add("letter--error");
      }
    },
    [letters, position]
  );

  useEffect(() => {
    if (position === letters.length && inGame) {
      alert("Você venceu!");
      resetGame();
    }
  }, [inGame, letters.length, position]);

  useEffect(() => {
    if (inGame)
      intervalRef.current = setInterval(() => {
        alert("Tempo esgotado!");
        resetGame();
      }, config.time);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [inGame, config.time]);

  useEffect(() => {
    if (inGame) document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, inGame]);

  return (
    <div className='container'>
      {inGame ? (
        <div className='wrapper'>
          <div className='letters'>{renderLetters}</div>
          <div className='timer'>
            <div
              className='timer__progress'
              style={{ animationDuration: `${config.time}ms` }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <h1>Configurar</h1>
          <label className='input-group'>
            Tempo:{" "}
            <input
              type='number'
              value={config.time}
              onChange={(e) => setConfig({ ...config, time: e.target.value })}
            />
          </label>
          <label className='input-group'>
            Quantidade de letras:{" "}
            <input
              type='number'
              value={config.countLetters}
              onChange={(e) =>
                setConfig({ ...config, countLetters: e.target.value })
              }
            />
          </label>
          <button className='btn' onClick={startGame}>
            Iniciar
          </button>
        </>
      )}
    </div>
  );
};
export default App;
