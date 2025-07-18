 import { NavLink } from "react-router-dom"
import "../index.css"

 function NavBar() {
   return (
     <nav style={{ display: "flex", justifyContent: "flex-start", gap: "10px", alignItems: "center", padding: "10px", backgroundColor: "#f8f9fa" }}>
        <p><span style={{color:" rgba(255, 30, 0, 0.685)", fontWeight:"bolder"}}>Bulls</span>Eye</p>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/newgoal" className="nav-link">Add Goal</NavLink>
        <NavLink to="/overview" className="nav-link">Overview</NavLink>
     </nav>
     )
    }

export default NavBar;