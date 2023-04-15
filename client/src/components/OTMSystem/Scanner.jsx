import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');
//   const [userEvents, setEvents] = useState([]);
  return (
    <>
    <div style={{"width":"400px"}}>
        <h1>QR Code Scanner</h1>
    
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
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