import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";
// import TicketDownload from "./TicketDownload";
import Card from "./Card";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";
function Profile() {
    const componentRef = useRef();
    const { state: { contract, accounts } } = useEth();
    const { loggedUser } = useEth();
    // console.log(loggedUser)
    const [loaded, setLoading] = useState(false);
    const [AllTickets, setAllTickets] = useState([]);
    const [userTickets, setTickets] = useState([]);
    const [userEvents, setEvents] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const sellTicket = async (eventId, ticketNo, key) => {
        await contract.methods.sellTicket(eventId, ticketNo, key).send({ from: accounts[0] });
        console.log("Bik Gaya");
        window.location.reload(false);
        console.log("Bik Gaya Na");

    }
    const recoverFund = async (eventId) => {
        await contract.methods.recoverFund(eventId).send({ from: accounts[0] });
        window.location.reload(false);
    }
    const showStatus = (ticketNo) => {
        const ticket = userTickets[ticketNo]
        if (ticket.isCancelled) return false
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
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    if (loggedUser[4])
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
                                if (!loaded) return <></>;
                                const flag = AllTickets[eventId]['isClosed']
                                return (
                                    <>

                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{eventId}</td>
                                            <td>{AllTickets[eventId]['numTickets']}</td>
                                            <td>{AllTickets[eventId]['numTickets'] - AllTickets[eventId]['unSoldTickets']}</td>
                                            <td>{AllTickets[eventId]['collections'] / 1000000000000000000}</td>
                                            {!flag && <td><Button variant="success" onClick={() => recoverFund(eventId)}>Recover Money</Button></td>}
                                            {flag && <td><Button variant="danger" disabled onClick={() => recoverFund(eventId)}>Event CLosed</Button></td>}
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
                                if (!loaded) return <></>;
                                console.log("EventId: ", ticket['eventId']);
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
                                            {flag && <td><Button variant="success" onClick={() => sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Sell Ticket</Button></td>}
                                            {!flag && <td><Button variant="danger" disabled onClick={() => sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Cancelled</Button></td>}
                                            <td><Button variant="primary" onClick={handlePrint}>Download</Button></td>
                                            <div style={{"display":"none"}} >
                                                <div ref = {componentRef} style={{"width":"100%"}} >
                                                    <div style={{"padding":"10vw"}}>

                                                    <Card
                                                    ticketId={ticket['ticketId']}
                                                    eventId={ticket['eventId']}
                                                    src={AllTickets[ticket['eventId']]['src']}
                                                    dest={AllTickets[ticket['eventId']]['dest']}
                                                    owner={accounts[0]}
                                                    date={AllTickets[ticket['eventId']]['date']}
                                                    mode = {AllTickets[ticket['eventId']]['mode']}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
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
                                if (!loaded) return <></>;
                                const flag = showStatus(key);
                                // const handleDownload = () => {
                                //     // download in pdf format
                                //     // const doc = new jsPDF();
                                //     // doc.text(`Ticket ID: ${ticket['ticketId']}`, 10, 10);
                                //     // doc.text(`Event ID: ${ticket['eventId']}`, 10, 20);
                                //     // doc.text(`Source: ${AllTickets[ticket['eventId']]['src']}`, 10, 30);
                                //     // doc.text(`Destination: ${AllTickets[ticket['eventId']]['dest']}`, 10, 40);
                                //     // doc.save(`ticket_${ticket['ticketId']}.pdf`);

                                // }
                                
                               
                                return (
                                    <>

                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{AllTickets[ticket['eventId']]['owner']}</td>
                                            <td>{ticket['ticketId']}</td>
                                            <td>{AllTickets[ticket['eventId']]['src']}</td>
                                            <td>{AllTickets[ticket['eventId']]['dest']}</td>
                                            {flag && <td><Button variant="success" onClick={() => sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Sell Ticket</Button></td>}
                                            {!flag && <td><Button variant="danger" disabled onClick={() => sellTicket(ticket['eventId'], ticket['ticketId'], key)}>Cancelled</Button></td>}
                                            <td><Button variant="primary" onClick={handlePrint}>Download</Button></td>
                                            <div style={{"display":"none"}} >
                                                <div ref = {componentRef} style={{"width":"100%"}} >
                                                    <div style={{"padding":"10vw"}}>

                                                    <Card
                                                    ticketId={ticket['ticketId']}
                                                    eventId={ticket['eventId']}
                                                    src={AllTickets[ticket['eventId']]['src']}
                                                    dest={AllTickets[ticket['eventId']]['dest']}
                                                    owner={accounts[0]}
                                                    date={AllTickets[ticket['eventId']]['date']}
                                                    mode = {AllTickets[ticket['eventId']]['mode']}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            
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