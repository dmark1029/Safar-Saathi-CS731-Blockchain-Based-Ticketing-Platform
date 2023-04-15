
// import { useEth } from "../../contexts/EthContext";
// import { useNavigate } from "react-router-dom";
// import ViewAvailableTickets from "./ViewAvailable";
// import { useState } from "react";
// function Route() {
//     const navigate = useNavigate();
//     const {setLoggedUser} = useEth();
//     const [index, setIndex] = useState(0);
//     const [show, setShow] = useState(!false);
//     const OnAdd = () => {
//         setLoggedUser("Yash");
//     }
    
//     const OpenDemo = () => {
//         navigate("/demo");
//     }
//     const ShowTickets = (e) => {
//         // setIndex[e.target.value];
//         setShow(true);
//     }
//     const OnChangeIndex = (e) => {
//         setIndex(e.target.value);
//     }
//     return (
//         <>
//            <div>euirgui</div>
//            <button onClick={OnAdd}>Add User</button>
//            <button onClick={OpenDemo}>openDemo</button>

//            <form onClick={ShowTickets}  >
//                 <input type="text" value={index} placeholder="Enter Array Index" onChange={OnChangeIndex} />
//                 <button type="submit">Show Tickets</button>
//             </form>
//             {show  && <ViewAvailableTickets/>}
       
//         </>
//     )
// }

// export default Route;



import ViewAvailableTickets from "./ViewAvailable";

function Route() {
    
    return (
        <>
            {<ViewAvailableTickets/>}
        </>
    )
}

export default Route;