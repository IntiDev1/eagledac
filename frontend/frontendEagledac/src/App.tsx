import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AuditPanelPage from "./pages/AuditPanelPage";
import DacCreatorPage from "./pages/DacCreatorPage";
import DacPanelPage from "./pages/DacPanelPage";

function App() {
  return (
    <BrowserRouter>
      <Flex>
        <Sidebar />
        <Box ml="220px" flex="1">
          <Routes>
            <Route path="*" element={<AuditPanelPage />} />
            <Route path="/creator" element={<DacCreatorPage />} />
            <Route path="/deploy" element={<DacPanelPage />} />
            <Route path="*" element={<AuditPanelPage />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
