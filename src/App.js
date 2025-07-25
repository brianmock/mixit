import { useState } from "react";
import { useUser } from "./hooks/useUser";

import Auth from "./components/Auth";
import Swatch from "./components/Swatch";
import Mix from "./components/Mix";
import Fade from "./components/Fade";
import Score from "./components/Score";
import History from "./components/History";
import { User } from "./components/User";

function App() {
  const [user, setUser] = useUser();

  const score = localStorage.getItem(new Date().toLocaleDateString()) !== null;
  const [myColor, setMyColor] = useState({
    cyan: 0,
    magenta: 0,
    yellow: 0,
    black: 0,
  });

  const [step, setCurrStep] = useState(score ? 3 : 0);
  const [lastStep, setLastStep] = useState(step);

  function setStep(newStep) {
    if (step !== 4) {
      setLastStep(step);
    }
    setCurrStep(newStep);
  }

  const steps = {
    0: <Swatch setStep={setStep} />,
    1: <Mix setMyColor={setMyColor} myColor={myColor} setStep={setStep} />,
    2: <Fade setStep={setStep} myColor={myColor} />,
    3: (
      <Score
        user={user}
        myColor={myColor}
        setStep={setStep}
        setMyColor={setMyColor}
      />
    ),
    4: <History lastStep={lastStep} user={user} setStep={setStep} />,
  };

  return (
    <>
      <User setStep={setStep} user={user} setUser={setUser} />
      <Auth user={user} setUser={setUser} />
      {steps[step]}
    </>
  );
}

export default App;
