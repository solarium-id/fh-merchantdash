import { Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";

export default function Home() {
  return (
    <Flex
      flexDir="column"
      justify="center"
      align="center"
      py="16"
      px="4px"
      borderWidth="medium"
      rounded="xl"
      borderStyle="dashed"
    >
      <Text fontSize="xl" fontWeight="bold">
        Dashboard
      </Text>
    </Flex>
  );
}
