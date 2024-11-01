import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [advice, setAdvice] = useState({});
  const [isAdvice, setIsAdvice] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(res.data);
      setIsAdvice(true);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="box">
          {isAdvice ? <h1 className="id">ADVICE #{advice.slip.id}</h1> : null}
          <div className="cont">
            {isAdvice ? (
              <h1 className="advice">"{advice.slip.advice}"</h1>
            ) : null}
          </div>
          <div className="divider">
            <span className="pause-icon">||</span>
          </div>
          <button onClick={getAdvice}>
            <img src="/assets/dice.png" width={24} height={24} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
