import "../index.css";
import {useState, useEffect} from "react";

function SummaryItem({ goal }) {      
    const { name, targetAmount, savedAmount, category, deadline, createdAt } = goal;

    const[completed, setCompleted] = useState(false);
    const[overDue, setOverDue] = useState(false);
    
    const currentDate= new Date();
    const deadlineDate = new Date(deadline);
    const createdAtDate = new Date(createdAt);
    const timeGiven = Math.floor((deadlineDate - createdAtDate) / (1000 * 60 * 60 * 24));
    const timeLapsed = Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24));

    useEffect(() => {
        if (savedAmount >= targetAmount) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
        if (currentDate >= deadlineDate && savedAmount < targetAmount) {  
            setOverDue(true);
        } else {    
            setOverDue(false);  
        }
    }, [savedAmount, targetAmount, deadlineDate, currentDate]);

    if (!goal) {
        return <div>Loading...</div>;
    }

    return (
        <>
          <h3 style={{marginBottom:"0px", textDecoration:"underline"}}>{name}</h3>
          <div className="overview-item">
            <p className="text-gray-700"><strong>Target Amount: </strong><span style={{color:"rgb(255, 30, 0)"}}>ksh{targetAmount}</span></p>
            <p className="text-gray-700"><strong>Amount saved: </strong> <span style={{color:"rgb(255, 30, 0)"}}>ksh{savedAmount}</span></p>
            <p className="text-gray-700"><strong>Category: </strong> <span style={{color:"rgb(255, 30, 0)"}}>{category}</span></p>
            <p className="text-gray-700"><strong>Deadline: </strong><span style={{color:"rgb(255, 30, 0)"}}>{new Date(deadline).toLocaleDateString()}</span></p>
            <p className="text-gray-500 text-sm"><strong>Date created: </strong><span style={{color:"rgb(255, 30, 0)"}}>{new Date(createdAt).toLocaleDateString()}</span></p>
         <div className="status">
              { completed ? (
              <p style={{color:"green"}}>Goal 100% Achieved!</p>
             ) : (
              <p style={{color:"blue"}}>Goal Not Achieved</p>
             )}

             {overDue? (
                <div style={{display:"flex", alignItems:"center"}}>
                <p style={{color:"purple", display:"inline"}}>Goal Overdue!!</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert-icon lucide-octagon-alert"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>
                </div>
                 ) : (
                <p style={{color:"blue"}}>Goal On Track</p>)}

                {timeGiven-timeLapsed <= 30 && savedAmount < targetAmount && currentDate < deadlineDate ? (
                <p style={{color:"orange"}}> <span style={{color:"red"}}>Warning:</span> Less than 30 days to deadline</p>) : true}


           </div>
        </div>
        </>
    );
    }

export default SummaryItem;