import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container } from "react-bootstrap";

function Profile() {
    const { state: { contract, accounts } } = useEth();
    const [allTickets, setTickets] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
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
                        </tr>
                    </thead>
                    <tbody>
                        {allTickets.map((ticket, key) => {
                            console.log(ticket);
                            return (
                                <>

                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{ticket['eventId']}</td>
                                        <td>{ticket['ticketId']}</td>
                                        <td>{ticket['owner']}</td>
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