import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import "../index.css";
import { useParams } from "react-router-dom";

function EditGoal() {
 const params = useParams();
  const goalId = params.id;
  const [goal, setGoal] = useState({});

  const[formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: ""
  })

  useEffect(()=>{
    fetch(`http://localhost:3001/goals/${goalId}`)
      .then((response) => response.json())
      .then((data) => setGoal(data))
      .catch((error) => console.error("Error fetching goal:", error));
  }, [goalId]);


  function handleChange(event) {
   setFormData({
    ...formData,
    [event.target.name]: event.target.value
   })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedGoal = {     
      ...goal,
      name: formData.name || goal.name,
      targetAmount: formData.targetAmount || goal.targetAmount,
      category: formData.category || goal.category,
      deadline: formData.deadline || goal.deadline
    };
    
    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Goal updated successfully:", data);
        setGoal(data);
        setFormData({
          name: "",
          targetAmount: "",
          category: "",
          deadline: ""
        });
      })
      .catch((error) => {
        console.error("Error updating goal:", error);
      });
  }

  return (
    <div>
        <header>
        <NavBar />
        </header><hr/>
      <h1 style={{textAlign:"center", fontSize:"30px"}}>Edit '{goal.name}' goal</h1><hr/>
      <form onSubmit={handleSubmit} className="form">
         <label htmlFor="goalName" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Goal Name
         </label>
        <input value={formData.name} name="name" onChange={handleChange} className="formInput" style={{marginBottom:"30px"}}  type="text" placeholder="Goal Name" id="goalName"/> 

       <label htmlFor="targetAmount" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Target Amount
         </label>
        <input value={formData.targetAmount} 
        onChange={handleChange} className="formInput" style={{marginBottom:"30px"}}  type="number" placeholder="5000" id="targetAmount" name="targetAmount"/> 

        <label htmlFor="category" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Change Category
         </label>
        <input value={formData.category}
         onChange={handleChange} className="formInput" type="text" placeholder="Holiday" name="category" id="category"  style={{marginBottom:"30px"}} /> 

        <label htmlFor="deadline" style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
         Adjust Deadline  
        </label>
        <input onChange={handleChange} value={formData.deadline}  className="formInput" name="deadline" type="date" id="deadline" style={{marginBottom:"30px"}} />

        <input style={{width:"100px", height:"35px", borderRadius:"10px"}} type="submit" value="Submit edits"></input>

      </form>
    </div>
  );
}   

export default EditGoal;