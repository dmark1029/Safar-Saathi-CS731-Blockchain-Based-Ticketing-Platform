import React from "react";
import "./style.css";
// import QRSampleImg from "../Card/qr-sample.png";
// import img from "./qr.png";
// import bg from "./bg.jpg";
// import bg from "./bg1.png";
// const img = require("./qr-sample.png");
import { database } from "../firebase";
import {doc, getDoc} from "firebase/firestore";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import img from "../img.png";
const Card = (props) => {
  const [owner, setOwner] = useState("");
  const docRef = doc(database, "users", props.owner);
  useEffect(() => {
    const getDoc1 = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setOwner(docSnap.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDoc1();
  }, [docRef]); 
  
  
  // const { card } = props;
  const src = props.src;
  const dest = props.dest;
  const temp = props.date.split("_");
  const date = temp[0];
  const time = temp[1];
  const getMode = (mode) => {
    // console.log(mode);
    if (mode === "0") return "Bus";
    else if (mode === "1") return "Train";
    else if (mode === "2") return "Flight";
    else return "Car";
}
  const meta = [
    {
      title: getMode(props.mode),
      subtitle: owner,
    },
    {
      title: "Ticket_No.",
      subtitle: "A"+props.ticketId,
    },
    {
      title: "Event_No.",
      subtitle: "E" + props.eventId,
    },
  ];
  let card = {
    source: src,
    destination: dest,
    date: date,
    departure_time: time,
    arrival_time: time,
    meta: meta,
  };
  const qr = props.eventId + "_" + props.ticketId + "_" + props.owner;


  return (
    <>
    <div className="card-container">
      <div className="bg_img">
      </div>
      <div className="row1 hr-1">
        <div className="hr-1-title">{card.source}</div>
        <div>{card.date}</div>
        <div className="hr-1-title">{card.destination}</div>
      </div>
      <div className="row1 hr-2">
        <div>Time- {card.departure_time}</div>
        <div></div>
        <div></div>
        {/* <div>{card.arrival_time}</div> */}
      </div>
      <div className="row1 row-start meta-section">
        <div className="meta-container">
          {card.meta &&
            card.meta.map((details, index) => (
              <div key={"details-" + index} className="meta">
                <div className="title">{details.title}</div>
                <div className="subtitle">{details.subtitle}</div>
              </div>
            ))}
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <img src={img} alt="QR code" width={80} height={80} /> */}
          <div style={{ height: 80, margin: "0 auto", maxWidth: 100, width: 80 }}>
            <QRCode
              bgColor="transparent"
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qr}
              
            />
          </div>
        </div>
      </div>
      <svg
        className="line-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 172.03 0.8"
      >
        <path
          d="M341.49,225h172"
          transform="translate(-341.49 -224.5)"
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
        />
      </svg>
      
    </div>
    <div className="card-container1">
    <img src={img} alt="" height="245px"  />
    </div>
    </>
  );
};

export default Card;
