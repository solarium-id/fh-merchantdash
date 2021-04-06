import { Flex, Text } from "@chakra-ui/layout";
import { authRouting } from "../lib/authRouting";
import type { GetServerSideProps } from "next";

// cek serverside auth untuk memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  // jika belum login maka akan diredirect ke halaman login
  if (result !== "") {
    return { redirect: { destination: result, permanent: false } };
  } else {
    // selain itu maka bisa masuk
    return { props: { result } };
  }
};

// Component homepage utama
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
