import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "@/pages/login.tsx";
import {Dashboard} from "@/pages/dashboard.tsx";

export function App() {
    return (
       <div className="h-screen flex flex-col bg-zinc-900">
           <Router>
               <Routes>
                   <Route path="/" element={<Login />} />
                   <Route path="/dashboard" element={<Dashboard />} />
               </Routes>
           </Router>
       </div>
    )
}