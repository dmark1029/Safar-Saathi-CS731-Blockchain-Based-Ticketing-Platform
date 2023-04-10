import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
import Demo from "./components/Demo";
// import Footer from "./components/Footer";

import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import OTMSystem from "./components/OTMSystem";
import PrivateRoute from "./components/OTMSystem/PrivateRoute";
// import NoticeNoUser from "./components/OTMSystem/NoticeLoginUser";
// import NoticeWrongNetwork from "./components/OTMSystem/NoticeWrongNetwork";
// import NoticeNoArtifact from "./components/OTMSystem/NoticeNoArtifact";
import ViewAvailableTickets from "./components/OTMSystem/ViewAvailable";
import Profile from "./components/OTMSystem/Profile";
import CreateEvent from "./components/OTMSystem/CreateEvent";
function App() {
  return (
    <>
    <BrowserRouter>

    <div className="Routes-landing-page"></div>
    <EthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute><OTMSystem /></PrivateRoute>} />
        <Route path="/demo" element={ <PrivateRoute><Demo /></PrivateRoute> } />
        <Route path="/error" element={ <PrivateRoute><Demo /></PrivateRoute> } />
        <Route path="/tickets" element={ <PrivateRoute><ViewAvailableTickets /></PrivateRoute> } />
        <Route path="/profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
        <Route path="/createEvent" element={ <PrivateRoute><CreateEvent /></PrivateRoute> } />
      </Routes>
      {/* <div id="App">
        <div className="container">
          <Demo />
        </div>
      </div> */}
    </EthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
