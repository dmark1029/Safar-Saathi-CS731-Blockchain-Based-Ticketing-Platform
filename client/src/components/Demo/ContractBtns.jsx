import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  console.log(contract, accounts);
  const [ticketno, setTicketNo] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [tickets, setTickets] = useState("");
  const [val, setValue] = useState(-1);
  const handleInputChange = e => {
    // if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    // }
  };
  const OnChange = e => {
    setTicketNo(e.target.value);
  }

  const read = async () => {
    const value = await contract.methods.eventIndex().call();
    setValue(value);
  };
  const CreateEvent = async () => {
    const {tt} = await contract.methods.createEvent("Train",1, 10, 2, "Knapur", "Delhi").send({from : accounts[0]});
    console.log(tt);
  }

  const ShowTickets = async () => {
    const temp = (await contract.methods.showAvailableTickets(val-1).call()).toString();
    setTickets(temp);
  }
 

  const BuyTickets = async () => {
    await contract.methods.buyTicket(val-1, ticketno).send({ from : accounts[0], value:3*10**18});
  }


  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    // const newValue = parseInt(inputValue);
    await contract.methods.addUser(inputValue, 1).send({ from: accounts[0] });
  };

  
  const write1 = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (ticketno === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(ticketno);
    await contract.methods.buyTicket(val-1, newValue).send({ from : accounts[0], value:3*10**18});
  };

  

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>
      <button onClick={CreateEvent}>
        CreateEvent
      </button>
      <div>
            <h3>Tickets are:</h3><p>{tickets}</p>
      </div>
      <button onClick={ShowTickets}>
        ShowTickets
      </button>
      <div> Event Index is: {val} </div>
      

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="Name"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>
      <div onClick={write1} className="input-btn">
        write1(<input
          type="text"
          placeholder="TicketNo to buy"
          value={ticketno}
          onChange={OnChange}
        />)
      </div>
        
      <button onClick={BuyTickets}>
        Buy Tickets
      </button>

    </div>
  );
}

export default ContractBtns;
