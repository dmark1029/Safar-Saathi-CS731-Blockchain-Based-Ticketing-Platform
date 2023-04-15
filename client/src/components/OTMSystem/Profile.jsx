import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";

function Profile() {
    const { state: { contract, accounts } } = useEth();
    const { loggedUser } = useEth();
    const [loaded, setLoading] = useState(false);
    const [AllTickets, setAllTickets] = useState([]);
    const [userTickets, setTickets] = useState([]);
    const [userEvents, setEvents] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const sellTicket = async (eventId, ticketNo, key) => {
        await contract.methods.sellTicket(eventId, ticketNo, key).send({from : accounts[0]});
        console.log("Bik Gaya");
        window.location.reload(false);
        console.log("Bik Gaya Na");

    }
    const recoverFund = async (eventId) => {
        await contract.methods.recoverFund(eventId).send({from : accounts[0]});
        window.location.reload(false);
    }
    const showStatus = (ticketNo) => {
        const ticket = userTickets[ticketNo]
        if(ticket.isCancelled)return false
        // if((ticket['owner']===accounts[0] && !ticket['isSold'])||(ticket['owner']!==accounts[0]))return false
        else return true
    }
    useEffect(() => {
        const getTickets = async () => {
            const value = await contract.methods.getUserDetails(accounts[0]).call();
            setUserDetails(value);
            // console.log(value);
            const value1 = await contract.methods.showUserTickets(accounts[0]).call();
            // console.log(value1);
            setTickets(value1);
            const value2 = await contract.methods.showUserEvents(accounts[0]).call();
            // console.log(value2);
            setEvents(value2);

            const value3 = await contract.methods.showAllEvents().call();
            // console.log(value1);
            setAllTickets(value3);
            setLoading(true);
           
        };
        getTickets();
    }, [contract, accounts])
    // const [showt, setShowt] = useState(-1);
    if(loggedUser[4])
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
                            <th>User Name</th>
                            <th>DOB</th>
                            <th>Phone Number</th>
                            <th>Email ID</th>
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
                        <h2>Published Events</h2>
                    </Col>
                </Row>
                <Table striped bordered hover variant="">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Event ID</th>
                            <th>Total Tickets</th>
                            <th>Sold Tickets</th>
                            <th>Collection Till Now (ETH)</th>
                            <th>Event Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userEvents.map((eventId, key) => {
                            // console.log(eventId);
                            if(!loaded) return <></>;
                            const flag = AllTickets[eventId]['isClosed']
                            return (
                                <>

                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{eventId}</td>
                                        <td>{AllTickets[eventId]['numTickets']}</td>
                                        <td>{AllTickets[eventId]['numTickets']-AllTickets[eventId]['unSoldTickets']}</td>
                                        <td>{AllTickets[eventId]['collections']/1000000000000000000}</td>
                                        {!flag && <td><Button variant="success" onClick={()=>recoverFund(eventId)}>Recover Money</Button></td>}
                                        {flag && <td><Button variant="danger" disabled onClick={()=>recoverFund(eventId)}>Event CLosed</Button></td>}
                                        <td></td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <h2>My Tickets</h2>
                    </Col>
                </Row>
                <Table striped bordered hover variant="">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Publisher's Address</th>
                            <th>Ticket ID</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Sell</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTickets.map((ticket, key) => {
                            if(!loaded) return <></>;
                            console.log("EventId: ",ticket['eventId']); 
                            console.log(":Ticket details ", AllTickets[ticket['eventId']]);
                            console.log("Owner: ", AllTickets[ticket['eventId']]['owner']);
                            const flag = showStatus(key);
                            return (
                                <>

                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{AllTickets[ticket['eventId']]['owner']}</td>
                                        <td>{ticket['ticketId']}</td>
                                        <td>{AllTickets[ticket['eventId']]['src']}</td>
                                        <td>{AllTickets[ticket['eventId']]['dest']}</td>
                                        {flag && <td><Button variant="success" onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Sell Ticket</Button></td>}
                                        {!flag && <td><Button variant="danger" disabled onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Cancelled</Button></td>}
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
    else
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
                            <th>S No.</th>
                            <th>Event Creator</th>
                            <th>TicketId</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Sell</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTickets.map((ticket, key) => {
                            // console.log(ticket);
                            const flag = showStatus(key);
                            return (
                                <>

                                    <tr>
                                        <td>{key + 1}</td>
                                        {/* <td>{AllTickets[ticket['eventId']]['owner']}</td> */}
                                        <td>{ticket['ticketId']}</td>
                                        <td>{AllTickets[ticket['eventId']]['src']}</td>
                                        <td>{AllTickets[ticket['eventId']]['dest']}</td>
                                        {flag && <td><Button variant="success" onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Sell Ticket</Button></td>}
                                        {!flag && <td><Button variant="danger" disabled onClick={()=>sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Cancelled</Button></td>}
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