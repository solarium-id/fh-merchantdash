import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Sidebar from "./Sidebar";
import { ReactQueryDevtools } from "react-query/devtools";
function Layout({ children }) {
  return (
    <>
      <Flex
        style={{ minHeight: "100vh" }}
        flexDir="row"
        justify="space-between"
      >
        {/* sidebar */}
        <Sidebar />

        {/* main content */}
        <Box ml="20%" width="80%" p="4" height="auto" color="gray.800">
          {children}
        </Box>
      </Flex>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default Layout;
