import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Flex style={{ height: "100vh" }} flexDir="row" justify="space-between">
        {/* sidebar */}
        <Sidebar />

        {/* main content */}
        <Box width="80%" p="4" color="gray.800">
          {children}
        </Box>
      </Flex>
    </>
  );
}

export default Layout;
