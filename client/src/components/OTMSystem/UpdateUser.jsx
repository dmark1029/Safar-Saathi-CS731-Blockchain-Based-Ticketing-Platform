import { useEth } from "../../contexts/EthContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { database } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
function UpdateUser() {
    const { state: { contract, accounts }, setLoggedUser, loggedUser } = useEth();
    const handleInputChangeName = e => { setName(e.target.value); };
    const handleInputChangeDate = e => { setDate(e.target.value); };
    const handleInputChangeMobile = e => { setMobile(e.target.value); };
    const handleInputChangeEmail = e => { setEmail(e.target.value); };
    console.log("loggedUser: ", loggedUser);
    const [name, setName] = useState(loggedUser[0]);
    const [date, setDate] = useState(loggedUser[1]);
    const [type, setType] = useState(loggedUser[4]);
    const [mobile, setMobile] = useState(loggedUser[2]);
    const [email, setEmail] = useState(loggedUser[3]);
    const anonymous = false;
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let type1 = parseInt(type);
            console.log(name, date, type1, mobile, email);
            const { tt } = await contract.methods.addUser(name, date, mobile, email, loggedUser[4]).send({ from: accounts[0] });
            console.log(tt);
            const value = await contract.methods.getUserDetails(accounts[0]).call();
            console.log("value: ", value);
            setLoggedUser(value);
            await setDoc(doc(database, "users", accounts[0]), {
                name: name,
                date: date,
                mobile: mobile,
                email: email,
                type: type,
            });
            window.location.reload(false);
        } catch (error) {
            alert("Some Error Occured");   
        }

    }
    // console.log("type: ", type);
    return (
        <>
            <div style={{ "width": "50%", "marginLeft": "25vw", "paddingTop": "20px" }}>
                <h1>Update User</h1>
                <Form onSubmit={HandleSubmit}>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Anonymous" onChange={(e) => { setAnonymous(e.currentTarget.checked); console.log("anonymous: ", e.currentTarget.checked); }} />  
                    </Form.Group> */}
                    {!anonymous && <>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={name} inputRef={name} onChange={handleInputChangeName} type="text" placeholder="Enter User Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control defaultValue={date} inputRef={date} onChange={handleInputChangeDate} type="date" placeholder="Enter your DOB" />
                    </Form.Group>
                    </>
                    }
                    <Form.Group controlId="formBasicSelect" style={{"paddingBottom":"10px"}}>
                        <Form.Label>Select User Type</Form.Label>
                        <Form.Select
                            value={type}
                            onChange={(e) => {setType(e.currentTarget.value); console.log("type_: ", e.currentTarget.value);}}
                            required
                            disabled={true}
                            // defaultValue={loggedUser[4]}
                        >
                            {loggedUser[4] === false && <option value="0">Buyer</option>}
                            {loggedUser[4] === true && <option value="1">Ticket Provider</option>}
                            
                        </Form.Select>
                    </Form.Group>
                    {!anonymous && <>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control defaultValue={mobile} inputRef={mobile} onChange={handleInputChangeMobile} type="number" placeholder="Enter Mobile Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control defaultValue={email} inputRef={email} onChange={handleInputChangeEmail} type="text" placeholder="Enter Email Id" />
                    </Form.Group>
                    </>
                    }
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>

    )
};

export default UpdateUser;