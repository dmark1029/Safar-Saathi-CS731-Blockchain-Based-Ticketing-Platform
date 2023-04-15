import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { Form, Button } from "react-bootstrap";
import Error from "./404";
// import { useNavigate } from "react-router-dom";
// import { database } from "./firebase";
// import { doc, setDoc } from "firebase/firestore"; 
function CreateEvent() {
    // const navigate = useNavigate();
    const date1 = new Date();
    const { state: { contract, accounts }, loggedUser } = useEth();
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    const handleInputChangeName = e => { setName(e.target.value); };
    const handleInputChangeDate = e => { setDate(e.target.value); };
    const handleInputChangeTime = e => { setTime(e.target.value); };
    // const handleInputChangeMode = e => { setMode(e.target.value); };
    const handleInputChangeSource = e => { setSource(e.target.value); };
    const handleInputChangeDestination = e => { setDestination(e.target.value); };
    const handleInputChangePrice = e => { setPrice(e.target.value); };
    const handleInputChangeTotalTickets = e => { setTotalTickets(e.target.value); };

    const [name, setName] = useState("");
    const [date, setDate] = useState(formatDate(date1));
    // console.log("date: ", date);
    const [time, setTime] = useState("");
    const [mode, setMode] = useState(0);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [price, setPrice] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let mode1 = parseInt(mode);
            const temp = date + "_" + time;
            const { tt } = await contract.methods.createEvent(temp, mode1, totalTickets, price, source, destination).send({ from: accounts[0] });
            console.log(tt);
        } catch (error) {
            alert(error);
        }
        window.location.reload(false);
    }
    if(!loggedUser[4]) return (<Error/>);

    return (
        <div style={{ "width": "50%", "marginLeft": "25vw", "paddingTop": "20px" }}>
            <h1>Publish Tickets</h1>
            <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Agency Name</Form.Label>
                    <Form.Control inputRef={name} onChange={handleInputChangeName} type="text" placeholder="Enter Event Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control defaultValue={date} inputRef={date} onChange={handleInputChangeDate} type="date" placeholder="Enter Event Date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control inputRef={time} onChange={handleInputChangeTime} type="time" placeholder="Enter Event Time" />
                </Form.Group>
                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Mode</Form.Label>
                    <Form.Select
                        value={mode}
                        onChange={(e) => { setMode(e.currentTarget.value); }}
                        required
                    >
                    <option value="">select</option>
                    <option value="0">Bus</option>
                    <option value="1">Train</option>
                    <option value="2">Flight</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Source</Form.Label>
                    <Form.Control inputRef={source} onChange={handleInputChangeSource} type="text" placeholder="Enter Event Source" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control inputRef={destination} onChange={handleInputChangeDestination} type="text" placeholder="Enter Event Destination" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Ticket Price</Form.Label>
                    <Form.Control inputRef={price} onChange={handleInputChangePrice} type="number" placeholder="Enter Event Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control inputRef={totalTickets} onChange={handleInputChangeTotalTickets} type="number" placeholder="Enter Event Total Tickets" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CreateEvent;
