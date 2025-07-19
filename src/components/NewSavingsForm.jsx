
function NewSavingsForm({goals, onSelected, onSavingsAdded, onSubmitSavings}) {
  return (
    <form onSubmit= {onSubmitSavings} style={{display: 'flex', flexDirection: 'column', alignItems:"center" , gap: '1rem'}}>
      <h2>New savings</h2>
      <label>
        Amount to Save:
        <input onChange={(e)=>onSavingsAdded(e.target.value)} style={{marginLeft: '0.6rem', height: "25px", border:"1.5px,solid, rgba(255, 30, 0, 0.685) ", borderRadius:"7px"}} type="number" name="amountSaved" required />
      </label>
        <label >
        Save for:
      <select onChange={(e)=>onSelected(e.target.value)} style={{margin: '1.2rem', height: "20px"}} name="savingsGoal" required>
        <option value="" disabled selected>Select a goal</option>
        {goals.map((goal)=>(
            <option key={goal.id} value={goal.name}>{goal.name}</option>
        ))}
      </select>
      </label>
      <button className="link" type="submit">Add Savings</button>
    </form>
  );
}

export default NewSavingsForm;