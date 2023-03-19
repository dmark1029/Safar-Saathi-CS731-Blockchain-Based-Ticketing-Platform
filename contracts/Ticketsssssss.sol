// SPDX-License-Identifier: UNLICENSESED
pragma solidity ^0.8.19;

contract EventFactory{
    
    mapping (uint => Event) public events;
    uint public eventIndex;

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

    
    function createEvent(string memory _name, uint _date, uint _numTickets, uint _ticketPrice) public{
        require(users[msg.sender].doesExist && users[msg.sender].isProvider);
        Event storage e = events[eventIndex];
        e.owner = payable(msg.sender);
        e.eventId = eventIndex;
        e.name = _name;
        e.date = _date;
        e.numTickets = _numTickets;
        e.unSoldTickets = _numTickets;
        e.ticketPrice = _ticketPrice;

        for(uint i=1; i<=_numTickets; i++){
            Ticket storage newTicket = e.tickets[i];
            newTicket.owner = payable(msg.sender);
            newTicket.ticketId = i;
            newTicket.eventId = eventIndex;
            newTicket.isSold = false;
        }
        eventIndex++;
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
    
    function buyTicket(uint _eventId, uint _ticketNo) public{
        require(users[msg.sender].doesExist);
        Event storage e = events[_eventId];
        require(_ticketNo<e.numTickets);
        require(!e.tickets[_ticketNo].isSold);
        e.tickets[_ticketNo].isSold = true;
        e.unSoldTickets--;
        e.tickets[_ticketNo].owner = payable(msg.sender);
    }

    function sellTicket(uint _eventId, uint _ticketNo) public payable{
        Event storage e = events[_eventId];
        require(_ticketNo<e.numTickets);
        require(e.tickets[_ticketNo].owner == msg.sender);
        require(e.tickets[_ticketNo].isSold);

        e.tickets[_ticketNo].isSold = false;
        e.unSoldTickets++;
        e.tickets[_ticketNo].owner = e.owner;
    }
}