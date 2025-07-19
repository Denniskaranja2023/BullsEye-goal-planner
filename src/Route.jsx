import EditGoal from "./pages/EditGoal"
import Home from "./pages/Home"
import NewGoal from "./pages/NewGoal"   
import Overview from "./pages/Overview"
import TrackProgress from "./pages/TrackProgress"

const routes=[
    {
        path: "/",
        element: <Home />
    },
     {
        path: "/newgoal",
        element: <NewGoal/>
    },
     {
        path: "/progress/:id",
        element: <TrackProgress/>
    },
     {
        path: "/editgoal/:id",
        element: <EditGoal/>
    },
     {
        path: "/overview",
        element: <Overview />
    },

]

export default routes;