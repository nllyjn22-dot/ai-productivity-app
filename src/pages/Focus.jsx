import { useState, useEffect } from "react";

function Focus() {
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("study");
  const [sessions, setSessions] = useState(0);

  // ✅ SINGLE EFFECT (Timer + Switch combined)
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // 🔥 SWITCH MODE HERE
          if (mode === "study") {
            setMode("break");
            setSessions((s) => s + 1);
            return breakTime * 60;
          } else {
            setMode("study");
            return studyTime * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode, studyTime, breakTime]);

  // ✅ FORMAT
  function formatTime(sec) {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s < 10 ? "0" : ""}${s}`;
  }

  // ✅ CONTROLS
  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setMode("study");
    setSeconds(studyTime * 60);
    setSessions(0);
  }

  function applyCustomTime() {
    setIsRunning(false);
    setMode("study");
    setSeconds(studyTime * 60);
  }

  return (
    <div className="container">
      <h2 className="title">Focus Mode</h2>

      {/* SETTINGS */}
      <div className="card focus-settings">
        <label>
          Study:
          <input
            type="number"
            min="1"
            value={studyTime}
            onChange={(e) => setStudyTime(Math.max(1, Number(e.target.value)))}
          />
        </label>

        <label>
          Break:
          <input
            type="number"
            min="1"
            value={breakTime}
            onChange={(e) => setBreakTime(Math.max(1, Number(e.target.value)))}
          />
        </label>

        <button onClick={applyCustomTime}>Apply</button>
      </div>

      {/* STUDY CARD */}
      <div className={`focus-card ${mode === "study" ? "active" : ""}`}>
        <h3>📚 Study Time</h3>
        <h1 className="timer">
          {mode === "study" ? formatTime(seconds) : studyTime + ":00"}
        </h1>
      </div>

      {/* BREAK CARD */}
      <div className={`focus-card break ${mode === "break" ? "active" : ""}`}>
        <h3>☕ Break Time</h3>
        <h1 className="timer">
          {mode === "break" ? formatTime(seconds) : breakTime + ":00"}
        </h1>
      </div>

      {/* CONTROLS */}
      <div className="focus-buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <p className="session">Sessions Completed: {sessions}</p>
    </div>
  );
}

export default Focus;
