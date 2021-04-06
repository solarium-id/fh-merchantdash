import React from "react";
import { useRouter } from "next/router";
import { Box, Flex, Spacer, VStack, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";

const SideLink = [
  { title: "Dashboard", slug: "/" },
  { title: "Kategori", slug: "/kategori" },
  { title: "Merchant", slug: "/merchant" },
];

function Sidebar() {
  const router = useRouter();

  return (
    <Flex
      flexDir="column"
      align="center"
      width="20%"
      h="full"
      p="4"
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
    </Flex>
  );
}

export default Sidebar;
