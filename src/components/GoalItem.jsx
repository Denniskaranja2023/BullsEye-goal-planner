import { Link } from "react-router-dom";
import "../index.css";

function GoalItem({ goal}) {
  return (
    <div className="goal-item" style={{width: "300px", height: "fit-content", border: "1px solid black", backgroundColor:"#f8f9fa", borderRadius: "8px"}}>
      <h3><span style={{color:"rgba(255, 30, 0, 0.685)"}}>Goal:</span> {goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Deadline: {goal.deadline}</p>
      <p>current savings: ${goal.savedAmount}</p>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Link className="link" to={`/progress/${goal.id}`}>Track progress</Link>
        <button className="link">Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;