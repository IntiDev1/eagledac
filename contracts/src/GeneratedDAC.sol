// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Generated DAC Smart Contract
contract GeneratedDAC {
    address public owner;
    string public purpose;

    event PurposeUpdated(string oldPurpose, string newPurpose);

    constructor(string memory _purpose) {
        owner = msg.sender;
        purpose = _purpose;
    }

    function updatePurpose(string memory _newPurpose) external {
        require(msg.sender == owner, "Only owner can update purpose");
        emit PurposeUpdated(purpose, _newPurpose);
        purpose = _newPurpose;
    }
}
