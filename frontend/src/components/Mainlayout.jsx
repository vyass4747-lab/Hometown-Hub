import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Mainlayout() {

    return (
        <div className="min-h-screen">

            <Navbar />

            <Outlet />

        </div>
    );
}

export default Mainlayout;