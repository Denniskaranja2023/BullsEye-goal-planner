import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

function TrackProgress() {
  const params = useParams();

  const goalId = params.id;
  const [goal, setGoal] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/goals/${goalId}`)
      .then((response) => response.json())
      .then((data) => setGoal(data))
      .catch((error) => console.error("Error fetching goal:", error));
  }, [goalId]);
  
  const calculateTimeGiven = (deadline, createdAt) => {
    const deadlineDate = new Date(deadline);
    const createdAtDate = new Date(createdAt);
    const timeDifference = deadlineDate - createdAtDate;
    const daysGiven = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysGiven;
  };
  const calculateTimeLapsed = (createdAt) => {
  const createdAtDate = new Date(createdAt);
  const today = new Date();
  const timeDifference = today - createdAtDate;
  const daysLapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysLapsed;
};
 const calculateTimeProgress = (deadline, createdAt) => {
    const timeGiven = calculateTimeGiven(deadline, createdAt);
    const timeLapsed = calculateTimeLapsed(createdAt);
    if (timeLapsed > timeGiven) return 100;
    else {// If deadline is today or in the past, consider it fully completed
    const progressPercentage = Math.round((timeLapsed / timeGiven) * 100)
  return progressPercentage}}

  const calculateFinancialProgress = (targetAmount, savedAmount) => {
    if (targetAmount === 0) return 0;
    if (savedAmount > targetAmount) savedAmount = targetAmount; 
    const progressPercentage = Math.round((savedAmount / targetAmount) * 100);
    return progressPercentage;
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
    <div className="track-progress">
      <h2 style={{textAlign: "center"}}>Goal Progress</h2> 
      <hr></hr>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center", width: "300px", height: "fit-content", border: "1px solid black", backgroundColor:"#f8f9fa", borderRadius: "8px", padding: "20px"}}>
      <h3 className="link" style={{textAlign:"center", fontSize: "20px"}}>Goal: {goal.name}</h3>
      <p><strong>Category:</strong> {goal.category}</p>
      <h4 style={{textDecoration:"underline"}}><strong>Financial Progress</strong></h4>
      <p style={{marginTop:"0px"}}><strong>Target:</strong> ksh{goal.targetAmount}</p>
      <p style={{marginTop:"0px"}}><strong>Current Savings:</strong> ksh{goal.savedAmount}</p>
      <p style={{marginTop:"0px"}}><strong>Remaining:</strong> ksh{goal.targetAmount-goal.savedAmount}</p>
      {goal.targetAmount && goal.savedAmount ? (
        <>
          <p><strong>Financial progress:</strong> {calculateFinancialProgress(goal.targetAmount, goal.savedAmount)}%</p>
          <div style={{ width: "100%", backgroundColor:  "#e0e0e0", borderRadius: "8px", marginTop: "10px" }}>
            <div
              style={{      
                width: `${calculateFinancialProgress(goal.targetAmount, goal.savedAmount)}%`,
                backgroundColor: "rgba(255, 30, 0, 0.685)",
                height: "15px",
                borderRadius: "8px",
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>
        </>
      ) : (
        <p>Loading financial progress...</p>
      )}
      <hr></hr>
      <h4 style={{textDecoration:"underline"}}><strong>Progress in Time</strong></h4>
      <p style={{marginTop:"0px"}}><strong>Deadline:</strong> {goal.deadline}</p>
      <p style={{marginTop:"0px"}}><strong>Date Created:</strong> {goal.createdAt}</p>
      <p style={{marginTop:"0px"}}><strong>Time given:</strong>{calculateTimeGiven(goal.deadline, goal.createdAt)} days</p>
      <p style={{marginTop:"0px"}}><strong>Time lapsed:</strong> {calculateTimeLapsed(goal.createdAt)} days</p>
      <p style={{marginTop:"0px"}}><strong>Time remaining:</strong> {(calculateTimeGiven(goal.deadline, goal.createdAt) - calculateTimeLapsed(goal.createdAt))<=0? 0: (calculateTimeGiven(goal.deadline, goal.createdAt) - calculateTimeLapsed(goal.createdAt)) } days</p>
      {goal.createdAt && goal.deadline ? (
  <>
    <p><strong>Time progress:</strong> {calculateTimeProgress(goal.deadline, goal.createdAt,)}%</p>

    <div style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "8px", marginTop: "10px" }}>
      <div
        style={{
          width: `${calculateTimeProgress(goal.deadline,goal.createdAt)}%`,
          backgroundColor: "rgba(255, 30, 0, 0.685)",
          height: "15px",
          borderRadius: "8px",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
    </div>
  </>
) : (
  <p>Loading time progress...</p>
)}

      </div>
    </div>
    </>
  );
}

export default TrackProgress;