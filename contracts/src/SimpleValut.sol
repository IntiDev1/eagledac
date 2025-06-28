// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SimpleVault
/// @notice A basic contract that allows users to deposit and withdraw ETH securely.
contract SimpleVault {
    mapping(address => uint256) public balances;

    /// @notice Deposit ETH into the contract.
    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        balances[msg.sender] += msg.value;
    }

    /// @notice Withdraw all ETH previously deposited.
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw failed");
    }

    /// @notice Get contract's current balance.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
