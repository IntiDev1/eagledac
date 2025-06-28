// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SimpleValut.sol";

/// @title SimpleVaultTest
/// @notice Test contract for the SimpleVault contract
contract SimpleVaultTest is Test {
    SimpleVault vault;
    address user = address(1);

    function setUp() public {
        vault = new SimpleVault();
        vm.deal(user, 10 ether);
    }

    function testDepositAndWithdraw() public {
        vm.prank(user);
        vault.deposit{value: 1 ether}();

        assertEq(vault.balances(user), 1 ether);

        vm.prank(user);
        vault.withdraw();

        assertEq(vault.balances(user), 0);
    }
}
