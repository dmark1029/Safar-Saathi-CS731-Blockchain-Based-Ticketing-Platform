import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarComp() {
  const navigate = useNavigate();
  const ClickHome = () => {
    navigate("");
  }
  const ClickE = () => {
    navigate("/createEvent", false);
  }
  const ClickProfile = () => {
    navigate("/profile", false);
  }
  const ClickTickets = () => {
    navigate("/tickets", false);
  }
  return (
    <>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br /> */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={ClickHome}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ClickE} >createEvent</Nav.Link>
            <Nav.Link onClick={ClickProfile} >View Profile</Nav.Link>
            <Nav.Link onClick={ClickTickets} >Book Tickets</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
}

export default NavbarComp;