// backend/script/DeployDAC.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {GeneratedDAC} from "../../contracts/src/GeneratedDAC.sol";

contract DeployDACScript is Script {
    function run() external {
        vm.startBroadcast();
        new GeneratedDAC("My AI DAC"); // ajustar constructor si lo tiene
        vm.stopBroadcast();
    }
}
