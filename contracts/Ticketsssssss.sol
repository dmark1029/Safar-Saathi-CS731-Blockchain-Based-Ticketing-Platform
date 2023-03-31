// SPDX-License-Identifier: UNLICENSESED
pragma solidity ^0.8.19;


contract EventFactory{
    mapping (uint => Event) public events;
    uint public eventIndex;
    uint[] ats;

    struct User{
        string name;
        bool isProvider;
        bool doesExist;
    }

    mapping (address => User) users;

    struct Ticket{
        address payable owner;
        uint ticketId;
        uint eventId;
        bool isSold;
    }
    struct Event{
        address payable owner;
        uint eventId;
        string name;
        uint date;
        uint numTickets;
        uint unSoldTickets;
        uint ticketPrice;
        string src;
        string dest;
        mapping(uint => Ticket) tickets;
    }

    function addUser(string memory _name, bool _isProvider) public{
        User storage provider = users[msg.sender];
        provider.name = _name;
        provider.isProvider = _isProvider;
        provider.doesExist = true;
    }

    function deleteUser() public{
        users[msg.sender].doesExist = false;
    }

    function createEvent(string memory _name, uint _numTickets, uint _ticketPrice, string memory _src, string memory _dest) public{
        require(users[msg.sender].doesExist && users[msg.sender].isProvider);
        Event storage e = events[eventIndex];
        e.owner = payable(msg.sender);
        e.eventId = eventIndex;
        e.name = _name;
        e.date = block.timestamp;
        e.numTickets = _numTickets;
        e.unSoldTickets = _numTickets;
        e.ticketPrice = _ticketPrice*10**18;
        e.src = _src;
        e.dest = _dest;
        for(uint i=1; i<=_numTickets; i++){
            Ticket storage newTicket = e.tickets[i];
            newTicket.owner = payable(msg.sender);
            newTicket.ticketId = i;
            newTicket.eventId = eventIndex;
            newTicket.isSold = false;
        }
        eventIndex++;
    }

    function showAvailableEvents(string memory _src, string memory _dest) public returns(uint[] memory){
        delete ats;
        uint[] storage avail = ats;
        for(uint i=0; i<eventIndex; i++){
            if(keccak256(abi.encodePacked((_src))) == keccak256(abi.encodePacked((events[i].src))) && keccak256(abi.encodePacked((_dest))) == keccak256(abi.encodePacked((events[i].dest)))){
                avail.push(i);
            }
        }
        uint[] memory available = new uint[](avail.length);
        for(uint i=0; i<avail.length; i++){
            available[i] = avail[i];
        }
        return available;
    }

    function showAvailableTickets(uint _eventId) public view returns(uint[] memory){
        Event storage e = events[_eventId];
        uint[] memory avail = new uint[](e.unSoldTickets);
        uint j=0;
        for(uint i=0; i<e.numTickets; i++){
            if(!e.tickets[i].isSold){
                avail[j] = i;
                j++;
            }
        }
        return avail;
    }
    function buyTicket(uint _eventId, uint _ticketNo) public returns(uint) {
        //require(users[msg.sender].doesExist);
        Event storage e = events[_eventId];
       // require(currentPrice(_eventId) <= msg.value, "The Price of Ticket doesn't match");
       require(_ticketNo<e.numTickets, "Ticket No. doesn't exist");
       require(!e.tickets[_ticketNo].isSold, "This ticket is soldout choose another seat");
        e.tickets[_ticketNo].isSold = true;
        e.unSoldTickets--;
        e.tickets[_ticketNo].owner = payable(msg.sender);
        return e.unSoldTickets;
    }

    function currentPrice(uint _eventId) public view returns(uint){
        Event storage e = events[_eventId];
        if(e.unSoldTickets > 9*e.numTickets/10){
            return e.ticketPrice;
        }
        else if(e.unSoldTickets > 8*e.numTickets/10){
            return 11*e.ticketPrice/10;
        }
        else if(e.unSoldTickets > 7*e.numTickets/10){
            return 12*e.ticketPrice/10;
        }
        else if(e.unSoldTickets > 6*e.numTickets/10){
            return 13*e.ticketPrice/10;
        }
        else if(e.unSoldTickets > 5*e.numTickets/10){
            return 14*e.ticketPrice/10;
        }
        else return 15*e.ticketPrice/10;
    }

    function sellTicket(uint _eventId, uint _ticketNo) public payable{
        Event storage e = events[_eventId];
        require(_ticketNo<e.numTickets);
        require(e.tickets[_ticketNo].owner == msg.sender);
        require(e.tickets[_ticketNo].isSold);

        e.tickets[_ticketNo].isSold = false;
        e.unSoldTickets++;
        e.tickets[_ticketNo].owner = e.owner;
        payable(msg.sender).transfer(3*e.ticketPrice/10);
    }

    function recoverFund(uint _eventId) public payable{
        Event storage e = events[_eventId];
        require(e.owner == msg.sender);
        payable(msg.sender).transfer((e.numTickets - e.unSoldTickets)*e.ticketPrice);
    }

    function bal() public view returns(uint){
        return address(this).balance;
    }
}
