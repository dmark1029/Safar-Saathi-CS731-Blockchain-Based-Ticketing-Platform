import Route from "./Route";
// import { useNavigate } from "react-router-dom";

function OTMSystem() {
    // const navigate = useNavigate()
    const page = <>
        <div>
            <Route/>
        </div>
    </>;

    return (
        <div className="main-container">
            <div className="main-heading">
                <h3>Online Ticket Management System</h3>
            </div>
            {page}
        </div>
    )
};

export default OTMSystem;
