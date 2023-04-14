import { useEth } from "../../contexts/EthContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SignIn(){
    const { state: { contract, accounts }, setLoggedUser } = useEth();
    const date1 = new Date();
    const handleInputChangeName = e => { setName(e.target.value); };
    const handleInputChangeDate = e => { setDate(e.target.value); };
    const handleInputChangeMode = e => { setMode(e.target.value); };
    const handleInputChangeSource = e => { setSource(e.target.value); };
    const handleInputChangeDestination = e => { setDestination(e.target.value); };
    const handleInputChangePrice = e => { setPrice(e.target.value); };
    const handleInputChangeTotalTickets = e => { setTotalTickets(e.target.value); };
    const [name, setName] = useState("");
    const [date, setDate] = useState(toString(date1));
    const [mode, setMode] = useState(0);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [price, setPrice] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        let mode1 = parseInt(mode);
        console.log(name, date, mode, source, destination, price, totalTickets)
        const { tt } = await contract.methods.createEvent(date, mode1, totalTickets, price, source, destination).send({ from: accounts[0] });
        console.log(tt);
        window.location.reload(false);
    }



    // const [inputValue, setInputValue] = useState("");
    // const handleInputChange = e => {
    //     // if (/^\d+$|^$/.test(e.target.value)) {
    //       setInputValue(e.target.value);
    //     // }
    //   };
    // const write = async e => {
    //     if (e.target.tagName === "INPUT") {
    //       return;
    //     }
    //     if (inputValue === "") {
    //       alert("Please enter a value to write.");
    //       return;
    //     }
    //     // const newValue = parseInt(inputValue);
    //     try
    //     {
    //         const {tt} = await contract.methods.addUser(inputValue,"03/07/2002","8239850413","sandeepb20@iitk.ac.in" ,1).send({ from: accounts[0] });
    //         console.log(tt);
    //         setLoggedUser(inputValue);
    //     }
    //     catch(err)
    //     {
    //         alert("Some error Occured, Please try again after sometime");
    //     }

        
    //   };

    return(
        <>
        <div style={{"width":"50%", "marginLeft":"25vw", "paddingTop":"20px"}}>
            <h1>Create Event</h1>
        <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control inputRef={name} onChange={handleInputChangeName} type="text" placeholder="Enter Event Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control inputRef={date} onChange={handleInputChangeDate} type="date" placeholder="Enter Event Date" />
                </Form.Group>
                <Form.Select aria-label="Default select example">
                    <Form.Label>Event Mode</Form.Label>
                    <Form.Control inputRef={mode} onChange={handleInputChangeMode} componentClass="select" placeholder="Select Mode of transportation" />
                    <option value="">select</option>
                    <option value="0">Bus</option>
                    <option value="1">Train</option>
                    <option value="2">Flight</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Source</Form.Label>
                    <Form.Control inputRef={source} onChange={handleInputChangeSource} type="text" placeholder="Enter Event Source" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Destination</Form.Label>
                    <Form.Control inputRef={destination} onChange={handleInputChangeDestination} type="text" placeholder="Enter Event Destination" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Price</Form.Label>
                    <Form.Control inputRef={price} onChange={handleInputChangePrice} type="number" placeholder="Enter Event Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Event Total Tickets</Form.Label>
                    <Form.Control inputRef={totalTickets} onChange={handleInputChangeTotalTickets} type="number" placeholder="Enter Event Total Tickets" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </>

    )
}

export default SignIn;



