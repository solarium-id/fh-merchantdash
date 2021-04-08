import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Spacer,
  VStack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { destroyCookie } from "nookies";

const SideLink = [
  { title: "Dashboard", slug: "/" },
  { title: "Kategori", slug: "/kategori" },
  { title: "Merchant", slug: "/merchant" },
];

function Sidebar() {
  const router = useRouter();

  // fungsi untuk logout
  const handleLogout = () => {
    // hapus cookies jwt
    destroyCookie(null, "jwt");
    // redirect ke login
    router.push("/login");
  };

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="1"
      flexDir="column"
      align="center"
      width="20%"
      height="full"
      px="4"
      py="8"
      color="gray.800"
      bg="gray.100"
      borderRight="1px"
      borderColor="gray.300"
    >
      {/* app name */}
      <Heading fontSize="2xl">Aplikasi</Heading>

      {/* sidebar menu */}
      <VStack mt="16" w="full">
        {SideLink.map(({ title, slug }) => (
          <Link href={slug} key={slug}>
            <Box
              w="full"
              py="3"
              px="4"
              rounded="md"
              fontWeight="semibold"
              cursor="pointer"
              bg={router.pathname === slug ? "blue.100" : "transparent"}
              color={router.pathname === slug ? "blue.600" : "gray.600"}
              _hover={{
                bg: router.pathname === slug ? "blue.100" : "gray.200",
              }}
            >
              <Text>{title}</Text>
            </Box>
          </Link>
        ))}
      </VStack>
      <Spacer />

      {/* logout button */}
      <Button
        onClick={handleLogout}
        colorScheme="red"
        variant="outline"
        w="full"
      >
        Logout
      </Button>
    </Flex>
  );
}

export default Sidebar;
