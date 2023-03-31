import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";

import { Row, Col, Container } from "react-bootstrap";

function ViewAvailableTickets (index) {
    const { state: { contract, accounts } } = useEth();
    const [tickets, setTickets] = useState([]);
   const index1 = parseInt(index.index);
    useEffect(() => {
        const getTickets = async () => {
            const temp = await contract.methods.showAvailableTickets(index1).call();
            // console.log(temp);
            setTickets(temp);
        };
        getTickets();
    }, [contract, index1])
    const BuyTickets = async (num) => {
        await contract.methods.buyTicket(index1, num).send({ from : accounts[0], value:3*10**18});
        window.location.reload(false);
      }
    return(
        <>
        <Container>
            <Row>
            <Col>
                    <h3>Available Tickets</h3>
                </Col>
            </Row>
            <Row >
               
            {tickets.map((ticket, key) => {
                return(
                    <Col>
                            <button onClick={() => BuyTickets(ticket)}>{ticket}</button>
                    </Col>
                )
            })}
            </Row>
        </Container>
        </>
    )
}

export default ViewAvailableTickets;