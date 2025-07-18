import NavBar from "../components/NavBar";

function Overview() {
  return (
    <div>
        <header>
            <NavBar />
        </header>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Overview Page</h1>
      <p className="text-lg">This is a simple overview page.</p>
    </div>
  );
}
export default Overview;