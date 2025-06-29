import { Box, VStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      w="220px"
      bg="gray.800"
      color="white"
      minH="100vh"
      position="fixed"
      p={4}
    >
      <VStack align="start" gap={4}>
        <NavLink to="/audit">
          {({ isActive }) => (
            <Box
              as="span"
              color={isActive ? "teal.300" : "white"}
              _hover={{ color: "teal.300" }}
            >
              🛡️ EagleAudit
            </Box>
          )}
        </NavLink>
        <NavLink to="/creator">
          {({ isActive }) => (
            <Box
              as="span"
              color={isActive ? "teal.300" : "white"}
              _hover={{ color: "teal.300" }}
            >
              🛠️ DAC Creator
            </Box>
          )}
        </NavLink>
        <NavLink to="/deploy">
          {({ isActive }) => (
            <Box
              as="span"
              color={isActive ? "teal.300" : "white"}
              _hover={{ color: "teal.300" }}
            >
              📦 DAC Panel
            </Box>
          )}
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
