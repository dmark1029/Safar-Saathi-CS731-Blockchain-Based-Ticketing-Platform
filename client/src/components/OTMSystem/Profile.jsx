import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";

function Profile() {
    const { state: { contract, accounts } } = useEth();
    const [AllTickets, setAllTickets] = useState([]);
    const [userTickets, setTickets] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const sellTicket = async (eventId, ticketNo) => {
        await contract.methods.sellTicket(eventId, ticketNo).send({from : accounts[0]});
        console.log("Bik Gaya");
        window.location.reload(false);
    }
    const showStatus = (eventId, ticketNo) => {
        const ticket = AllTickets[eventId]['tickets'][ticketNo]
        if((ticket['owner']===accounts[0] && !ticket['isSold'])||(ticket['owner']!==accounts[0]))return false
        else return true
    }
    useEffect(() => {
        const getTickets = async () => {
            const value = await contract.methods.getUserDetails(accounts[0]).call();
            setUserDetails(value);
            console.log(value);
            const value1 = await contract.methods.showUserTickets(accounts[0]).call();
            console.log(value1);
            setTickets(value1);
        };
        getTickets();
    }, [contract, accounts])

    useEffect(() => {
        const getAllUser = async () => {
            const value1 = await contract.methods.showAllEvents().call();
            console.log(value1);
            setAllTickets(value1);
        };
        getAllUser();
    }, [contract])

    // const [showt, setShowt] = useState(-1);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>User Profile</h1>
                    </Col>
                </Row>
                <Table striped bordered hover variant="">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>DOB</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userDetails[0]}</td>
                            <td>{userDetails[1]}</td>
                            <td>{userDetails[2]}</td>
                            <td>{userDetails[3]}</td>
                        </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <h2>Tickets</h2>
                    </Col>
                </Row>
                <Table striped bordered hover variant="">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event ID</th>
                            <th>TicketId</th>
                            <th>Owner</th>
                            <th>Sell</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTickets.map((ticket, key) => {
                            console.log(ticket);
                            const flag = showStatus(ticket['eventId'],ticket['ticketId']);
                            return (
                                <>

                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{ticket['eventId']}</td>
                                        <td>{ticket['ticketId']}</td>
                                        <td>{ticket['owner']}</td>
                                        {flag && <td><Button variant="success" onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'])}>Sell Ticket</Button></td>}
                                        {!flag && <td><Button variant="danger" disabled onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'])}>Cancelled</Button></td>}
                                        <td></td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Profile;