import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import {
  Flex,
  VStack,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import { setCookie } from "nookies";
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
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  // fungsi untuk melakukan login
  const loginMutation = useMutation((loginInfo) =>
    axios.post(`${endpoint}/login`, loginInfo)
  );

  // handle login button
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsInvalid(false);
    // jalankan fungsi login
    loginMutation.mutate(
      // @ts-ignore
      { email, password },
      {
        onError: (error) => {
          // ketika gagal
          setIsLoading(false);
          setIsInvalid(true);
          console.log(error);
        },
        onSuccess: ({ data }) => {
          // ketika berhasil
          // simpan nilai jwt di cookies
          setCookie(null, "jwt", data.jwt, {
            maxAge: 24 * 60 * 60,
            path: "/",
          });
          router.replace("/");
          setIsLoading(false);
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
            <FormControl id="email" isRequired isInvalid={isInvalid}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>Email atau password salah</FormErrorMessage>
            </FormControl>
            {/* password input */}
            <FormControl id="password" isRequired isInvalid={isInvalid}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>Email atau password salah</FormErrorMessage>
            </FormControl>
          </VStack>

          {/* login button */}
          <Button
            isLoading={isLoading}
            type="submit"
            mt="4"
            colorScheme="blue"
            w="full"
          >
            Masuk
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
