const SimpleStorage = artifacts.require("EventFactory");

module.exports = async function (callback) {
  const deployed = await SimpleStorage.deployed();
  console.log("deployed.. ");
  console.log("");
let eval;
  for (let i = 0; i < 102; i++) {
    let mode = i%3; // transport model
    let userType = (i%2)^1; // userType// first provider then consumer
    let userName = "user_"+i.toString();
    
    
    // ("(await deployed.getUserDetails({tx})).toString()");

    if(userType==0){
      const { tx } = await deployed.addUser(userName,"dob","mob", "email", userType);
    console.log("Buyer ",  `${tx}`,userName, " of type ", userType.toString() );
      // console.log(eval);
      // let {ht} = await deployed.buyTicket.sendTransaction(eval-1,0);
      
      // buyer buys half of prevoiusly made tickets
      // for(let j =0; j<i;i=i+2){
      //   await deployed.buyTicket.sendTransaction(eval-1,j);
      // }
      // console.log("tickets available after buying {", (await deployed.showAvailableTickets(eval-1)).toString(), "}");


      console.log("");
    }
    else{
      const { tx } = await deployed.addUser(userName,"dob","mob", "email", userType);
    console.log("Publisher ",  `${tx}`,userName, " of type ", userType.toString() );
      // provider
      let src = "src_"+i.toString();
      let dst = "dst_"+i.toString();
      let numTickets = (i+1)%51;
      let {st} = await deployed.createEvent("date",mode, numTickets,  i%3+1,src, dst);
      eval = (await deployed.eventIndex.call()).toNumber();
      // console.log(eval);
      console.log("tickets made {", (await deployed.showAvailableTickets(eval-1)).toString(), "}");
      console.log(numTickets.toString(), " Tickets made from ",src, " to ", dst, " of price ",  (i%3+1).toString());
      

      console.log("");
    }
    
  }
  callback();
};
