import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";



function ViewAvailableTickets() {
        function currentPrice(numTickets, unSoldTickets, ticketPrice){
        if(unSoldTickets > 9*numTickets/10){
            return ticketPrice;
        }
        else if(unSoldTickets > 8*numTickets/10){
            return 11*ticketPrice/10;
        }
        else if(unSoldTickets > 7*numTickets/10){
            return 12*ticketPrice/10;
        }
        else if(unSoldTickets > 6*numTickets/10){
            return 13*ticketPrice/10;
        }
        else if(unSoldTickets > 5*numTickets/10){
            return 14*ticketPrice/10;
        }
        else return 15*ticketPrice/10;
    }

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
    const BuyTickets = async (num, index2, numTickets, unSoldTickets, ticketPrice) => {
        // await contract.methods.
        const value = currentPrice(numTickets, unSoldTickets, ticketPrice);
        await contract.methods.buyTicket(index2, num).send({ from: accounts[0], value:value });
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
                            const ticketPrice = currentPrice(ticket['numTickets'], ticket['unSoldTickets'], ticket['ticketPrice']);
                            const onClick = () => {  if(key!==showt)setShowt(key);else setShowt(-1); }
                            const getMode = (mode) => {
                                if(mode === 0) return "Train";
                                else if(mode === 1) return "Bus";
                                else if(mode === 2) return "Flight";
                                else return "Car";
                            }
                            return (
                                <>
                                    <tr>
                                        <td>1</td>
                                        <td>{ticket['date']}</td>
                                        <td>{ticket['src']}</td>
                                        <td>{ticket['dest']}</td>
                                        <td>{getMode(ticket['mode'])}</td>
                                        <td>{ticket['unSoldTickets']}</td>
                                        <td>{ticketPrice}</td>
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
                                                            <Button disabled={disabled1} onClick={() => BuyTickets(ticket1['ticketId'], ticket['eventId'], ticket['numTickets'], ticket['unSoldTickets'], ticket['ticketPrice'])}>{ticket1['ticketId']}</Button>
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