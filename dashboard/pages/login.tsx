import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({ email, password });
  };

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
        <form onSubmit={handleLogin}>
          <VStack spacing="2">
            {/* email input */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            {/* password input */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>

          {/* login button */}
          <Button type="submit" mt="4" colorScheme="blue" w="full">
            Masuk
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
