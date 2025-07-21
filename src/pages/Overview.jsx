import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import "../index.css";
import SummaryItem from "../components/SummaryItem";

function Overview() {
  const baseURL = "https://bulls-eye-json-server-3.onrender.com/goals";
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}`)
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  if (!goals || goals.length === 0) {
    return <div>Loading...</div>;
  }
 const totalAmountSaved = goals.reduce((total, goal) => total + goal.savedAmount, 0);
  return (
    <div>
        <header>
            <NavBar />
        </header><hr/>
      <h1 style={{textAlign:"center"}}>Summary of goals</h1><hr/>
      <div className="goal-summary">
       <h2 className="goal-item">Number of <span style={{color:"rgba(255, 30, 0, 0.685)"}}>goals added:</span> {goals.length}</h2>
       <h2 className="goal-item" style={{width:"fit-content"}}>Total <span style={{color:"rgba(255, 30, 0, 0.685)"}}>Amount saved:</span> ksh{totalAmountSaved.toLocaleString()}</h2>
        {goals.map((goal) => (
          <SummaryItem key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}
export default Overview;