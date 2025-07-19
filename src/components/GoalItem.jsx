import { Link } from "react-router-dom";
import "../index.css";

function GoalItem({ goal, onDelete }) {
  return (
    <div className="goal-item" style={{width: "300px", height: "fit-content", border: "1px solid black", backgroundColor:"#f8f9fa", borderRadius: "8px"}}>
      <h3><span style={{color:"rgba(255, 30, 0, 0.685)"}}>Goal:</span> {goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Deadline: {goal.deadline}</p>
      <p>current savings: ksh {goal.savedAmount}</p>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Link className="link" to={`/editgoal/${goal.id}`} style={{display:"flex", alignItems:"center", backgroundColor:"rgba(44, 184, 51, 0.71)", color:"black"}}>Edit<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></Link>
        <Link className="link" to={`/progress/${goal.id}`}>Track progress</Link>
        <button onClick={onDelete} id={goal.id} className="link" style={{display:"flex", alignItems:"center", backgroundColor:"rgba(44, 184, 51, 0.71)", color:"black"}}>Delete<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>
    </div>
  );
}

export default GoalItem;