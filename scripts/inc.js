/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const SimpleStorage = artifacts.require("EventFactory");

module.exports = async function (callback) {
  const deployed = await SimpleStorage.deployed();
  // console.log("Printing.. ", deployed.get());

  const { tx } = await deployed.addUser("sandeep", 1);
  console.log(`Confirmed transaction ${tx}`);
    // console.log(deployed);
    const {st} = await deployed.createEvent("yash", 10,1,"delhi", "kanpur");
    const {st1} = await deployed.createEvent("y", 69,5,"dehi", "anpur");

    const eval = (await deployed.eventIndex.call()).toNumber();
    
    console.log((await deployed.showAvailableTickets(eval-2)).toString());
    console.log((await deployed.showAvailableTickets(eval-1)).toString());
    console.log(eval);
    console.log((await deployed.buyTicket.call(eval-2,6)).toNumber());
    // console.log((await deployed.buyTicket.call(eval-2,6)).toString());
    // const {aa} = await deployed.buyTicket.send(eval-2,6);
    // const {aa} = await deployed.currentPrice(0);
    console.log((await deployed.showAvailableTickets(eval-2)).toString());
    console.log((await deployed.currentPrice.call((eval-1))).toString());
    // console.log(await deployed.showAvailableTickets(0));
//   const updatedValue = (await deployed.get()).toNumber();
//   console.log(`Updated SimpleStorage value: ${updatedValue}`);
    console.log(await deployed.events.call(eval-2));
  callback();
};
