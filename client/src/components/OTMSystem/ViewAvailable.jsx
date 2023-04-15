import React, { useState, useEffect } from "react";
// import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
// import { useState, useEffect } from "https://cdn.skypack.dev/react";
import { useEth } from "../../contexts/EthContext";
import Table from 'react-bootstrap/Table';
import { Row, Col, Container, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./filter.css";

export default function ViewAvailableTickets() {
    function currentPrice(numTickets, unSoldTickets, ticketPrice) {
        if (unSoldTickets > 9 * numTickets / 10) {
            return ticketPrice;
        }
        else if (unSoldTickets > 8 * numTickets / 10) {
            return 11 * ticketPrice / 10;
        }
        else if (unSoldTickets > 7 * numTickets / 10) {
            return 12 * ticketPrice / 10;
        }
        else if (unSoldTickets > 6 * numTickets / 10) {
            return 13 * ticketPrice / 10;
        }
        else if (unSoldTickets > 5 * numTickets / 10) {
            return 14 * ticketPrice / 10;
        }
        else return 15 * ticketPrice / 10;
    }
    const { state: { contract, accounts } } = useEth();
    // const [items, setItems] = useState([]);
    const [_priceFilter, setPriceFilter] = useState(false);
    const [_showAvailable, setAvailableFilter] = useState(false);
    const [_src, setSrc] = useState("");
    const [_dest, setDest] = useState("");
    const [_date, setDate] = useState("");
    const [searchParam] = useState(["src", "dest"]);
    const [filterParam, setFilterParam] = useState("");
    const [allTickets, setTickets] = useState([]);
    console.log(_priceFilter);
    useEffect(() => {
        function search(items) {
            // Sort items by price
            if(_priceFilter){
                items.sort((a, b) => {
                    const p1 = currentPrice(a["numTickets"], a["unSoldTickets"], a["ticketPrice"]);
                    const p2 = currentPrice(b["numTickets"], b["unSoldTickets"], b["ticketPrice"]);
                    return p1 - p2;
                });
            }
            // Sort items by Available
            if(_showAvailable){
                if(!_priceFilter){
                    items.sort((b,a) => {
                        return a["unSoldTickets"] - b["unSoldTickets"];
                    });
                }
               
            }
            return items.filter((item) => {
                // console.log("item: ", item);
                if(item["isClosed"] === true){
                    return false;
                }
                if (item["src"].toString().toLowerCase().indexOf(_src.toLowerCase()) > -1) {
                    if (item["dest"].toString().toLowerCase().indexOf(_dest.toLowerCase()) > -1) {
                        if (item["mode"].toString().toLowerCase().indexOf(filterParam.toLowerCase()) > -1) {
                            if (item["date"].toString().toLowerCase().indexOf(_date.toLowerCase()) > -1) {
                                if(_showAvailable){
                                    if(item["unSoldTickets"] > 0){
                                        return true;
                                    }
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }
                return false;
            });
        }
        const getTickets = async () => {
            const value1 = await contract.methods.showAllEvents().call();
            // setTickets(value1);
            // setItems(value1);
            const data = Object.values(value1);
            let temp = search(data);
            setTickets(temp);
            // console.log(value1);

        };
        getTickets();
    }, [contract, _src, searchParam, _dest, filterParam, _priceFilter, _date, _showAvailable])
    const BuyTickets = async (num, index2, numTickets, unSoldTickets, ticketPrice) => {
        // await contract.methods.
        const value = currentPrice(numTickets, unSoldTickets, ticketPrice);
        await contract.methods.buyTicket(index2, num).send({ from: accounts[0], value: value });
        window.location.reload(false);
    }
    const [showt, setShowt] = useState(-1);




    return (
        <div className="wrapper">

            <div className="card-grid">
                
                <Container>
                    <Row>
                        <Col>
                            <h1>Available Tickets</h1>
                        </Col>
                    </Row>
                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for Source..."
                                value={_src}
                                onChange={(e) => setSrc(e.target.value)}
                            />
                            <span className="sr-only">Source here</span>
                        </label>
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for Destination..."
                                value={_dest}
                                onChange={(e) => setDest(e.target.value)}
                            />
                            <span className="sr-only">Destination here</span>
                        </label>
                        <label htmlFor="search-form">
                            <input
                                type="date"   
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for Date..."
                                value={_date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <span className="sr-only">Date here</span>
                        </label>

                        <div className="select">
                            <select
                                onChange={(e) => {
                                    setFilterParam(e.target.value);
                                }}
                                className="custom-select"
                                aria-label="Filter Countries By Region"
                            >
                                <option value="">Mode of Transportation</option>
                                <option value="0">Bus</option>
                                <option value="1">Train</option>
                                <option value="2">Flight</option>
                            </select>
                            <span className="focus"></span>
                        </div>
                        
                        
                    </div>
                    <div style={{padding:"5px"}}>
                        <Form>
                            <Row>
                                <Col>
                            <Form.Check
                                onChange={(e) => {
                                    setPriceFilter(e.target.checked);
                                }}
                                type="switch"
                                id="custom-switch"
                                label="Sort by Price"
                            />
                            </Col>
                            <Col>
                            <Form.Check
                                onChange={(e) => {
                                    setAvailableFilter(e.target.checked);
                                }}
                                type="switch"
                                id="custom-switch"
                                label="Show Available Tickets Only"
                            />
                            </Col>
                            </Row>
                        </Form>
                    </div>
                    
                    <Table striped bordered hover variant="">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Mode</th>
                                <th>Tickets Available</th>
                                <th>Ticket Price (ETH)</th>
                                <th>Publisher's Address</th>
                                <th>Buy Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTickets.map((ticket, key) => {
                                // console.log(ticket['src']);
                                const ticketPrice = currentPrice(ticket['numTickets'], ticket['unSoldTickets'], ticket['ticketPrice']);
                                const onClick = () => { if (key !== showt) setShowt(key); else setShowt(-1); }
                                const getMode = (mode) => {
                                    console.log(mode);
                                    if (mode === "0") return "Bus";
                                    else if (mode === "1") return "Train";
                                    else if (mode === "2") return "Flight";
                                    else return "Car";
                                }
                                
                                const timeArray = ticket['date'].split('_');
                                
                                return (
                                    <>
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{timeArray[0]}</td>
                                            <td>{timeArray[1]}</td>
                                            <td>{ticket['src']}</td>
                                            <td>{ticket['dest']}</td>
                                            <td>{getMode(ticket['mode'])}</td>
                                            <td>{ticket['unSoldTickets']}</td>
                                            <td>{ticketPrice/1000000000000000000}</td>
                                            <td>{ticket['owner']}</td>
                                            <td> <Button onClick={onClick}>{(key !== showt && <span>Show</span>) || (key === showt && <span>Hide</span>)} Tickets</Button> </td>

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
                                            <td></td>
                                            <td>
                                                <Row>
                                                    {showt === key && ticket['tickets'].map((ticket1, key) => {
                                                        const disabled1 = ticket1['isSold'];
                                                        return (
                                                            <Col>
                                                                <div style={{ "padding": "5px" }}></div>
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
            </div>
        </div>
    );
}
