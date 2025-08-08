// contracts/src/SimpleDAC.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDAC {
    string public name;
    string public purpose;
    address public creator;

    constructor(string memory _name, string memory _purpose, address _creator) {
        name = _name;
        purpose = _purpose;
        creator = _creator;
    }
}
