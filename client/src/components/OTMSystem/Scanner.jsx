import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useEth } from '../../contexts/EthContext';
const Test = (props) => {
    const { state: { contract, accounts } } = useEth();
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    // const [AllTickets, setAllTickets] = useState([]);
    useEffect(() => {
        const getTickets = async () => {

        const value3 = await contract.methods.showAllEvents().call();
        window.localStorage.setItem("AllTickets", JSON.stringify(value3));
        

    };
    getTickets();
    
}, [contract, accounts])
const showStatus = (data) => {
    // if(!loading) return -1;
    const d = window.localStorage.getItem("AllTickets");
    // console.log(d[0]);
    var obj = JSON.parse(d);
    const arr = data.split("_");
    const eventNo = arr[0];
    const ticketNo = arr[1];
    const owner = arr[2];
    // const event = AllTickets[eventNo];
    // console.log(event);
    // const ticket = event.tickets[ticketNo];
    // console.log(ticket['isCancelled']);
    console.log("d: ",obj[eventNo][12][ticketNo][0]);
    if(obj[eventNo][12][ticketNo][0] !== owner || obj[eventNo][12][ticketNo][0][4] === true ) return 0;
    return 1;
    // event.map((item) => console.log(item));
    
}
//    console.log(showStatus("2_0_0xC558cD7EE9A24A8C6C1c13a5F5B6a606368775de"));
  return (
    <>
    <div style={{"width":"400px"}}>
        <h1>Scan QR Code on Ticket</h1>
    
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            // setData(result?.text);
            setData(result?.text);
            console.log("Scanning");
            console.log(result?.text);
            console.log(showStatus(result?.text));
            if(showStatus(result?.text) === 1) alert("Ticket Verified");
            else if(showStatus(result?.text) === -1) alert("Technique Error");
            else alert("Ticket Invalid");
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
      </div>
    </>
  );
};

export default Test;