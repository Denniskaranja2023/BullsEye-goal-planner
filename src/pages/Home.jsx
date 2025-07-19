import NavBar from "../components/NavBar";
import React, {useState, useEffect} from "react";
import NewSavingsForm from "../components/NewSavingsForm";
import GoalItem from "../components/GoalItem";
import "../index.css";

function Home() {
 const[goals, setGoals] = useState([]);
 const[selectedGoal, setSelectedGoal] = useState("");
 const[savings, setSavings] = useState(0);
   
    useEffect(() => {
        fetch("http://localhost:3001/goals")
        .then((response) => response.json())
        .then((data) => setGoals(data));
    }, []);

  function handleSubmitSavings(event){
    event.preventDefault();
   const goalOfInterest= goals.find((goal) => goal.name === selectedGoal)
   
   if (!goalOfInterest) {
        alert("Goal not found");
        return;}

   const newSavings= (goalOfInterest.savedAmount) + parseInt(savings);
   console.log("New Savings:", newSavings);
    fetch(`http://localhost:3001/goals/${goalOfInterest.id}`, {
      method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            savedAmount: newSavings,
        }), 
    })
    .then((response) => response.json())
    .then((updatedGoal) => {
        const updatedGoals = goals.map((goal) => 
            goal.id === updatedGoal.id ? updatedGoal : goal
        );
        setGoals(updatedGoals);
        setSelectedGoal(""); // Reset selected goal
        event.target.reset();
  }).catch((error) => {
        console.error("Error updating savings:", error);
    });
    }

   function handleDelteGoal(event){
    event.preventDefault();
    const confirmMessage = confirm("Are you sure you want to delete this goal?") 
    if (!confirmMessage) return;

    const goalId = event.target.id;
    fetch(`http://localhost:3001/goals/${goalId}`,{
      method: "DELETE",
    }).then(()=>{
      const updatedGoals= goals.filter((goal)=> goal.id !== goalId);
      setGoals(updatedGoals);
    }).catch((error)=> console.error("Error deleteing goal :", error))
   }

  return (
    <div>
      <header >
        <NavBar />
      </header>
      <h2>Welcome to BullsEye goal-planner</h2><hr/>
      <NewSavingsForm goals={goals} onSelected={setSelectedGoal} onSavingsAdded={setSavings} onSubmitSavings={handleSubmitSavings}/> <br/> <hr/>
        <h2 style={{textAlign:"center"}}>Your Goals</h2>
        <div className="goal-list">
            {goals.map((goal)=>(
                <GoalItem 
                    key={goal.id} 
                    id={goal.id}
                    goal={goal} 
                    onDelete={handleDelteGoal}
                />
            ))}
        </div>
    </div>
  );
}

export default Home;