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
                <h1 ><b>Safar Saathi</b></h1><h3><i>Online Ticket Management System</i></h3>
            </div>
            {page}
        </div>
    )
};

export default OTMSystem;
