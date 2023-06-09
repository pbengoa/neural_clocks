import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import ProgressBar from "../progressBar";
import '../../styles/timer.css'


export default function Timer({id, minutes, seconds, create, name, task, handleFinish}) {

  const [[mins, secs], setTime] = useState([minutes, seconds]);  
  const [start, setStart] = useState(false);
  const countRef = useRef(null);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      alert('Tiempo finalizado: ' + name);
      handleFinish(id);
      resetTimer();
      
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const resetTimer = () => {
    
    setStart(false);
    setTime([parseInt(minutes), parseInt(seconds)]);
    if (countRef.current !== null) {
      clearInterval(countRef.current);
    }
  };

  useEffect(() => {
    if (start) {
      countRef.current = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(countRef.current);
    }
  });

  function handleButton() {
    setStart(!start)
  }

  return (
    <div className={create ? "container": "container-items"}>
      <div className="header">

        {create ?
          null:
          <>
            <h2>{name}-{task}</h2>
            <Button onClick={() => handleFinish(id)} variant="danger">
              <span aria-hidden="true">&times;</span>
            </Button>
          </>

        }

      </div>

        <div className="items">
          {secs < 10 ? 
            <h1 className="display-1"> {mins}:0{secs} </h1> : 
            <h1 className="display-1"> {mins}:{secs} </h1>
          }

        {create ?
          null :
          (mins + 1)/minutes * 100 > 100 ? 
          
          <ProgressBar percentage={100} maxValue={1}/> :
          <ProgressBar percentage={Math.trunc((mins + 1)/minutes * 100)}/>
        }
        </div>
        <div className="buttons">
          {create?
              null : start ?
              <Button variant="danger" onClick={handleButton}>Stop</Button>:
              <>
                <Button variant="success" onClick={handleButton}>Start</Button>{' '}
                <Button variant="danger" onClick={resetTimer}>Reset</Button>{' '}
              </>
              
            }
        </div>

      
    </div>

    

  );
}


