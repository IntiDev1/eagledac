// contracts/src/DACFactory.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SimpleDAC.sol";

contract DACFactory {
    event ContractDeployed(
        address indexed creator,
        address contractAddress,
        string name
    );

    function deployDAC(
        string memory name,
        string memory purpose
    ) external returns (address) {
        SimpleDAC newContract = new SimpleDAC(name, purpose, msg.sender);
        emit ContractDeployed(msg.sender, address(newContract), name);
        return address(newContract);
    }
}
