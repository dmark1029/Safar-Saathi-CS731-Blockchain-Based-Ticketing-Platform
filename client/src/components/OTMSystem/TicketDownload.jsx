// Download react component as  ticket pdf
import React from 'react';
import ReactToPrint from 'react-to-print';

import "./ticket.css"

export default function TicketDownload(vars) {
    // console.log(owner);
    console.log(vars['ticketId']);
    // console.log(src);

    const componentRef = React.useRef();
    return (
        <div>
            <div style={{ "display": "" }}>
                <div ref={componentRef}>
                    <h1>Download Ticket</h1>
                   
                </div>
            </div>

            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />

        </div >
    );
}