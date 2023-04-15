import Route from "./Route";
// import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import img from "./img.png";
function OTMSystem() {
    // const navigate = useNavigate()
    const page = <>
        <div>
            <Route/>
        </div>
    </>;

    return (
        <div className="main-container">
            <div className="main-heading" style={{"padding":"5px"}}>
                <Row >
                    {/* <Col span={12}>
                        <h1 ><b>Safar Saathi</b></h1><h3><i>Online Ticket Management System</i></h3>
                    </Col> */}
                    <Col span={12}>
                    <img src={img} alt="" height="300px" />
                    </Col>
                </Row>
                {/* <h1 ><b>Safar Saathi</b></h1><h3><i>Online Ticket Management System</i></h3> */}
                
            </div>
            {page}
        </div>
    )
};

export default OTMSystem;
