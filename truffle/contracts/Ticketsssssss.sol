// SPDX-License-Identifier: UNLICENSESED
pragma solidity ^0.8.18;


contract EventFactory{
    Event[] public events;
    uint public eventIndex;
    uint[] ats;

    struct User{
        string name;
        string dob;
        string mobile;
        string email;
        bool isProvider;
        bool doesExist;
    }

    mapping (address => User) users;
    mapping (address => Ticket[]) ticketToUser;
    mapping (address => uint[]) eventToUser;

    struct Ticket{
        address payable owner;
        uint eventId;
        uint ticketId;
        bool isSold;
        bool isCancelled;
    }
    struct Event{
        address payable owner;
        uint eventId;
        string date;
        uint modeOfTrans;
        uint numTickets;
        uint mode;
        uint unSoldTickets;
        uint ticketPrice;
        bool isClosed;
        uint collections;
        string src;
        string dest;
        Ticket[] tickets;
    }

    function UserExist(address _ad) public view returns(bool){
        return users[_ad].doesExist;
    }

    function getUserDetails(address _ad) public view returns(string memory, string memory, string memory, string memory, bool, bool){
        return (users[_ad].name, users[_ad].dob, users[_ad].mobile, users[_ad].email, users[_ad].isProvider, users[_ad].doesExist);
    }
    
    function showAllEvents () public view returns (Event[] memory){
        return events;
    }

    function addUser(string memory _name, string memory _dob, string memory _mobile, string memory _email, bool _isProvider) public{
        User storage provider = users[msg.sender];
        provider.name = _name;
        provider.dob = _dob;
        provider.mobile = _mobile;
        provider.email = _email;
        provider.isProvider = _isProvider;
        provider.doesExist = true;
    }

    function deleteUser() public{
        users[msg.sender].doesExist = false;
    }

    function createEvent(string memory _date, uint _mode, uint _numTickets, uint _ticketPrice, string memory _src, string memory _dest) payable public{
        require(users[msg.sender].doesExist && users[msg.sender].isProvider, "Only Publisher can create Event");
        events.push({});
        Event storage e = events[eventIndex];
        e.owner = payable(msg.sender);
        e.eventId = eventIndex;
        e.date = _date;
        e.mode = _mode;
        e.numTickets = _numTickets;
        e.unSoldTickets = _numTickets;
        e.ticketPrice = _ticketPrice*10**18;
        e.isClosed = false;
        e.collections = 0;
        e.src = _src;
        e.dest = _dest;
        for(uint i=0; i<_numTickets; i++){
            e.tickets.push({});
            Ticket storage newTicket = e.tickets[i];
            newTicket.owner = payable(msg.sender);
            newTicket.ticketId = i;
            newTicket.eventId = eventIndex;
            newTicket.isSold = false;
        }
        eventToUser[msg.sender].push(eventIndex);
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
    function buyTicket(uint _eventId, uint _ticketNo) payable public {
        require(users[msg.sender].doesExist, "No user Exist");
        Event storage e = events[_eventId];
        require(!e.isClosed, "The Following Event Have been Closed");
        require(currentPrice(_eventId) <= msg.value, "The Price of Ticket doesn't match");
        require(_ticketNo<e.numTickets, "Ticket No. doesn't exist");
        require(!e.tickets[_ticketNo].isSold, "This ticket is soldout choose another seat");
        require(!e.isClosed, "The Following Event Have been Closed");
        e.tickets[_ticketNo].isSold = true;
        e.tickets[_ticketNo].owner = payable(msg.sender);
        e.collections += msg.value;
        e.unSoldTickets--;
        e.tickets[_ticketNo].isCancelled = false;
        ticketToUser[msg.sender].push(e.tickets[_ticketNo]);
    }

    function currentPrice(uint _eventId) public view returns(uint){
        Event storage e = events[_eventId];
        require(!e.isClosed, "The Following Event Have been Closed");
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

    function sellTicket(uint _eventId, uint _ticketNo, uint key) public payable{
        Event storage e = events[_eventId];
        require(_ticketNo<e.numTickets, "Ticket Not Available");
        require(e.tickets[_ticketNo].owner == msg.sender, "Only Owner can sell the ticket");
        require(e.tickets[_ticketNo].isSold, "This ticket is soldout choose another seat");
        require(!e.isClosed, "The following Event have been Closed");

        e.tickets[_ticketNo].isSold = false;
        e.unSoldTickets++;
        e.tickets[_ticketNo].owner = e.owner;
        payable(msg.sender).transfer(4*e.ticketPrice/10);
        e.collections -= 4*e.ticketPrice/10;
        ticketToUser[msg.sender][key].isCancelled = true;
    }

    function showUserEvents(address _ad) public view returns(uint[] memory){
        return eventToUser[_ad];
    }

    function showUserTickets(address _ad) public view returns(Ticket[] memory){
        return ticketToUser[_ad];
    }

    function recoverFund(uint _eventId) public payable{
        Event storage e = events[_eventId];
        require(e.owner == msg.sender, "You are not the owner!!Don't try to steal their money");
        e.isClosed = true;
        payable(msg.sender).transfer(e.collections);
    }

    function bal() public view returns(uint){
        return address(this).balance;
    }
}
