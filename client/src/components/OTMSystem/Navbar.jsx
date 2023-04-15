import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEth } from '../../contexts/EthContext';
function NavbarComp() {
  const { state: { contract, accounts } } = useEth();
  const { loggedUser } = useEth();
  // console.log(loggedUser);
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
  const ClickDelete = async () => {
    await contract.methods.deleteUser().send({from : accounts[0]});
    window.location.reload(false);
    navigate("/", false);
  }
  const UpdateUserProfile = () => {
    navigate("/updateUser", false);
  }
  const VerifyTicket = () => {
    navigate("/verify", false);
  }
  if(!loggedUser) return null;
  if(!loggedUser[5]) return null;
  if(!loggedUser[4]) return (
    <>
    <Navbar bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand onClick={ClickHome}>Home</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link onClick={ClickE} >createEvent</Nav.Link> */}
          <Nav.Link onClick={ClickProfile} >View Profile</Nav.Link>
          <Nav.Link onClick={ClickTickets} >Book Tickets</Nav.Link>
          <Nav.Link onClick={UpdateUserProfile} >Update Profile</Nav.Link>
          <Nav.Link onClick={ClickDelete} > Delete User</Nav.Link>
          <Nav.Link onClick={VerifyTicket} > Verify Ticket</Nav.Link>

        </Nav>
      </Container>
    </Navbar>
    <br />
  </>
  );
  else
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={ClickHome}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ClickE} >Publish Tickets</Nav.Link>
            <Nav.Link onClick={ClickProfile} >User Profile</Nav.Link>
            <Nav.Link onClick={ClickTickets} >Book Tickets</Nav.Link>
            <Nav.Link onClick={UpdateUserProfile} >Update Profile</Nav.Link>
            <Nav.Link onClick={ClickDelete} > Delete User</Nav.Link>
            <Nav.Link onClick={VerifyTicket} > Verify Ticket</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarComp;