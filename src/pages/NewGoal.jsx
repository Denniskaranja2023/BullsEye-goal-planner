import NavBar from "../components/NavBar";
import "../index.css";
import { useState } from "react";





function NewGoal() {

  const [formData, setFormData] = useState({
  name: "",
  targetAmount: "",
  savedAmount: "",
  category: "",
  deadline: "",
  createdAt: new Date().toISOString().split('T')[0]
});

function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })
}

function handleSubmit(event) {
  event.preventDefault();
  const newGoal={
    name: formData.name,
    targetAmount: parseInt(formData.targetAmount),
    savedAmount: parseInt(formData.savedAmount),
    category: formData.category,
    deadline: formData.deadline,
    createdAt: formData.createdAt
  }
  fetch("http://localhost:3001/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newGoal)
  })
  .then( setFormData({
    name: "",
    targetAmount: "",
    savedAmount: "",
    category: "",
    deadline: "",
    createdAt: new Date().toISOString().split('T')[0]
  })
)
  .catch((error)=> console.error("Error adding new goal: ",error))
}

  return (
    <div >
        <header>
           <NavBar />
        </header> <hr/>
      <h1 style={{textAlign:"center"}} className="text-2xl font-bold mb-4">Add a new goal</h1><hr/>
      <form className="form" onSubmit={handleSubmit}>

        <label htmlFor="name" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Goal Name:</label>
        <input onChange={handleChange} className="formInput" value={formData.name} type="text" name="name" id="name" required/>

         <label htmlFor="targetAmount" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Target Amount:</label>
        <input onChange={handleChange} className="formInput" value={formData.targetAmount} type="number" name="targetAmount" id="targetAmount" required/>

         <label htmlFor="savedAmount" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Initial Savings:</label>
        <input onChange={handleChange} className="formInput" value={formData.savedAmount} type="number" name="savedAmount" id="savedAmount" required/>

         <label htmlFor="category" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Goal category:</label>
        <input onChange={handleChange} className="formInput" value={formData.category} type="text" name="category" id="category" required/>

         <label htmlFor="deadline" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Deadline</label>
        <input onChange={handleChange} className="formInput" value={formData.deadline} type="date" name="deadline" id="deadline" required/>

        <button type="submit" className="formButton" style={{ display:"block" ,marginTop: "10px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>Add Goal</button>

      </form>
    </div>
  );
}

export default NewGoal;