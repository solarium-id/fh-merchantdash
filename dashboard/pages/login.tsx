import React from "react";
import Link from "next/link";
import {
  Flex,
  VStack,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function Login() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh" }}
      bg="gray.100"
      color="gray.800"
    >
      <Flex
        p="12"
        flexDir="column"
        align="center"
        justify="center"
        gridGap="6"
        bg="white"
        rounded="xl"
        border="1px"
        borderColor="gray.300"
      >
        {/* heading */}
        <VStack spacing="0">
          <Text fontSize="2xl" fontWeight="bold">
            Masuk
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            Masuk Untuk Mengakses Dashboard
          </Text>
        </VStack>

        {/* login form */}
        <form>
          <VStack spacing="2">
            {/* email input */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="example@email.com" />
            </FormControl>
            {/* password input */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="password" />
            </FormControl>
          </VStack>

          {/* login button */}
          <Link href="/">
            <Button mt="4" colorScheme="blue" w="full">
              Masuk
            </Button>
          </Link>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
