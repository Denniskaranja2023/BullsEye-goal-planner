import NavBar from "../components/NavBar";
import React from "react";

function Home() {
  return (
    <div>
      <header >
        <NavBar />
      </header>
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
    </div>
  );
}

export default Home;