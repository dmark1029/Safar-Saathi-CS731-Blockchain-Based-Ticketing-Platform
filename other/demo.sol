// SPDX-License-Identifier: UNLICENSESED

pragma solidity >=0.4.22 <0.9.0;

contract demo{
    uint number = 69;
    function set(uint _number) public{
        number = _number;
    }
    function get() public view returns(uint){
        return number;
    }
}