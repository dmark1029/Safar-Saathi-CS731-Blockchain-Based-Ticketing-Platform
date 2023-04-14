import { useEth } from "../../contexts/EthContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SignIn(){
    const { state: { contract, accounts }, setLoggedUser } = useEth();
    const handleInputChangeName = e => { setName(e.target.value); };
    const handleInputChangeDate = e => { setDate(e.target.value); };
    const handleInputChangeType = e => { setType(e.target.value); };
    const handleInputChangeMobile = e => { setMobile(e.target.value); };
    const handleInputChangeEmail = e => { setEmail(e.target.value); };
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState(0);
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const HandleSubmit = async (e) => {
        e.preventDefault();
        let type1 = parseInt(type);
        console.log(name, date, type1, mobile, email);
        const { tt } = await contract.methods.addUser(name,date,mobile,email,type1).send({ from: accounts[0] });
        console.log(tt);
        setLoggedUser(name);
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
            <h1>Create User</h1>
        <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Name</Form.Label>
                    <Form.Control inputRef={name} onChange={handleInputChangeName} type="text" placeholder="Enter User Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control inputRef={date} onChange={handleInputChangeDate} type="date" placeholder="Enter your DOB" />
                </Form.Group>
                <Form.Select aria-label="Default select example">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control inputRef={type} onChange={handleInputChangeType} componentClass="select" placeholder="Select User Type" />
                    <option value="">select</option>
                    <option value="0">Buyer</option>
                    <option value="1">Ticket Publisher</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control inputRef={mobile} onChange={handleInputChangeMobile} type="number" placeholder="Enter Mobile Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control inputRef={email} onChange={handleInputChangeEmail} type="text" placeholder="Enter Email Id" />
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



