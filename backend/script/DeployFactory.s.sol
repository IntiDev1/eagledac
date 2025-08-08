// contracts/script/DeployFactory.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {DACFactory} from "../contracts/src/DACFactory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();
        DACFactory factory = new DACFactory();
        console.log("Factory deployed at:", address(factory));
        vm.stopBroadcast();
    }
}
