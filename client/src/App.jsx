import { EthProvider } from "./contexts/EthContext";
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import OTMSystem from "./components/OTMSystem";
import PrivateRoute from "./components/OTMSystem/PrivateRoute";
import ViewAvailableTickets from "./components/OTMSystem/ViewAvailable";
import Profile from "./components/OTMSystem/Profile";
import CreateEvent from "./components/OTMSystem/CreateEvent";
import Navbar from "./components/OTMSystem/Navbar";
import Filter from "./components/OTMSystem/Filter";
import UpdateUser from "./components/OTMSystem/UpdateUser";
// import Card from "./components/OTMSystem/Card/index";
import Test from "./components/OTMSystem/Scanner";
function App() {
  return (
    <>
    <BrowserRouter>

    <div className="Routes-landing-page"></div>
    
    <EthProvider>
    <Navbar/>
      <Routes>
        <Route path="/filter" element={<Filter />} />
        <Route path="/" element={<PrivateRoute><OTMSystem /></PrivateRoute>} />
        <Route path="/tickets" element={ <PrivateRoute><ViewAvailableTickets /></PrivateRoute> } />
        <Route path="/profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
        <Route path="/createEvent" element={ <PrivateRoute><CreateEvent /></PrivateRoute> } />
        <Route path="/updateUser" element={ <PrivateRoute><UpdateUser /></PrivateRoute> } />
        {/* <Route path="/ticketDownload" element={ <PrivateRoute><TicketDownload /></PrivateRoute> } /> */}
        <Route path="/verify" element={ <PrivateRoute><Test /></PrivateRoute> } />
      </Routes>
    </EthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
