import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";



function ViewAvailableTickets() {
    const { state: { contract, accounts } } = useEth();
    const [allTickets, setTickets] = useState([]);
    useEffect(() => {
        const getTickets = async () => {
            const value1 = await contract.methods.showAllEvents().call();
            console.log(value1);
            setTickets(value1);
        };
        getTickets();
    }, [contract])
    const BuyTickets = async (num, index2) => {
        await contract.methods.buyTicket(index2, num).send({ from: accounts[0], value: 3 * 10 ** 18 });
        window.location.reload(false);
    }
    const [showt, setShowt] = useState(-1);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Available Tickets</h1>
                    </Col>
                </Row>
                <Table striped bordered hover variant="">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Mode</th>
                            <th>Tickets Available</th>
                            <th>Ticket Price</th>
                            <th>Owner</th>
                            <th>Buy Tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTickets.map((ticket, key) => {
                            // console.log(ticket['src']);

                            const onClick = () => {  if(key!==showt)setShowt(key);else setShowt(-1); }
                            return (
                                <>
                                    <tr>
                                        <td>1</td>
                                        <td>{ticket['date']}</td>
                                        <td>{ticket['src']}</td>
                                        <td>{ticket['dest']}</td>
                                        <td>{ticket['mode']}</td>
                                        <td>{ticket['unSoldTickets']}</td>
                                        <td>{ticket['ticketPrice']}</td>
                                        <td>{ticket['owner']}</td>
                                        <td> <Button onClick={onClick}>{(key!==showt && <span>Show</span>) || (key===showt && <span>Hide</span>)} Tickets</Button> </td>

                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Row>
                                                {showt === key && ticket['tickets'].map((ticket1, key) => {
                                                    const disabled1 = ticket1['isSold'];
                                                    return (
                                                        <Col>
                                                            <div style={{"padding":"5px"}}></div>
                                                            <Button disabled={disabled1} onClick={() => BuyTickets(ticket1['ticketId'], ticket['eventId'])}>{ticket1['ticketId']}</Button>
                                                        </Col>

                                                    )
                                                }
                                                )}
                                            </Row>
                                        </td>
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

export default ViewAvailableTickets;