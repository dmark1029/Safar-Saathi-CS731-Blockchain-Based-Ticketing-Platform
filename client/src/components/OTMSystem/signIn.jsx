import { useEth } from "../../contexts/EthContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { database } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import img from "./img.png";
function SignIn() {
    const { state: { contract, accounts }, setLoggedUser } = useEth();
    const handleInputChangeName = e => { setName(e.target.value); };
    const handleInputChangeDate = e => { setDate(e.target.value); };
    const handleInputChangeMobile = e => { setMobile(e.target.value); };
    const handleInputChangeEmail = e => { setEmail(e.target.value); };

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let type1 = parseInt(type);
            console.log(name, date, type1, mobile, email);
            const { tt } = await contract.methods.addUser(name, date, mobile, email, type1).send({ from: accounts[0] });
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
            <div style={{ "width": "50%", "marginLeft": "25vw", "paddingTop": "0px" }}>
            <img src={img} alt="" height="245px"  />
                <h1>Create User</h1>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Anonymous" onChange={(e) => { setAnonymous(e.currentTarget.checked); console.log("anonymous: ", e.currentTarget.checked); }} />  
                    </Form.Group>
                    {!anonymous && <>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required inputRef={name} onChange={handleInputChangeName} type="text" placeholder="Enter User Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control required inputRef={date} onChange={handleInputChangeDate} type="date" placeholder="Enter your DOB" />
                    </Form.Group>
                    </>
                    }
                    <Form.Group controlId="formBasicSelect" style={{"paddingBottom":"10px"}}>
                        <Form.Label>Select User Type</Form.Label>
                        <Form.Select
                            value={type}
                            onChange={(e) => {setType(e.currentTarget.value); console.log("type_: ", e.currentTarget.value);}}
                            required
                        >
                            <option value="">Select-User Type</option>
                            <option value="0">Buyer</option>
                            <option value="1">Ticket Provider</option>
                        </Form.Select>
                    </Form.Group>
                    {!anonymous && <>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control required inputRef={mobile} onChange={handleInputChangeMobile} type="number" placeholder="Enter Mobile Number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control required inputRef={email} onChange={handleInputChangeEmail} type="text" placeholder="Enter Email Id" />
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

export default SignIn;