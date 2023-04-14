import { useEth } from "../../contexts/EthContext";
import { useState } from "react";
function SignIn(){
    const { state: { contract, accounts }, setLoggedUser } = useEth();
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = e => {
        // if (/^\d+$|^$/.test(e.target.value)) {
          setInputValue(e.target.value);
        // }
      };
    const write = async e => {
        if (e.target.tagName === "INPUT") {
          return;
        }
        if (inputValue === "") {
          alert("Please enter a value to write.");
          return;
        }
        // const newValue = parseInt(inputValue);
        try
        {
            const {tt} = await contract.methods.addUser(inputValue,"03/07/2002","8239850413","sandeepb20@iitk.ac.in" ,1).send({ from: accounts[0] });
            console.log(tt);
            setLoggedUser(inputValue);
        }
        catch(err)
        {
            alert("Some error Occured, Please try again after sometime");
        }

        
      };

    return(
        <>
        <div>
            <h1>Sign In</h1>
            <div onClick={write} className="input-btn">
                write(<input
                type="text"
                placeholder="Name"
                value={inputValue}
                onChange={handleInputChange}
            />)
      </div>
        </div>
        </>

    )
}

export default SignIn;