import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import {
  Flex,
  VStack,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import type { GetServerSideProps } from "next";

// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// cek serverside auth untuk memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  // jika sudah login maka akan diredirect ke halaman dashboard
  if (result !== "") {
    return { redirect: { destination: result, permanent: false } };
  } else {
    // selain itu maka bisa masuk halaman login
    return { props: { result } };
  }
};

// Component utama login
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // fungsi untuk melakukan login
  const loginMutation = useMutation((loginInfo) =>
    axios.post(`${endpoint}/login`, loginInfo)
  );

  // handle login button
  const handleLogin = (e) => {
    e.preventDefault();

    // jalankan fungsi login
    loginMutation.mutate(
      // @ts-ignore
      { email, password },
      {
        onError: (error) => {
          // ketika gagal
          console.log(error);
        },
        onSuccess: ({ data }) => {
          // ketika berhasil
          console.log(data);
        },
      }
    );
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
