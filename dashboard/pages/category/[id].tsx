import React from "react";
import { useQuery } from "react-query";
import {
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { authRouting } from "../../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching detail data kategori
const getCategoryDetail = async (token, id) => {
  const { data } = await axios.get(`${endpoint}/api/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
// server side rendering untuk mendapatkan detail kategori
// dan memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  if (result !== "") {
    // jika belum login maka akan diredirect ke halaman login
    return { redirect: { destination: result, permanent: false } };
  } else {
    // ambil id category dari url
    const categoryId = context.params.id;
    // ambil token dari cookies
    const token = nookies.get(context);
    // get data detail category
    const category = getCategoryDetail(token, categoryId);
    // kirimkan data category ke component utama
    return { props: { category } };
  }
};

function CategoryDetail(props) {
  return (
    <Flex
      border="1px"
      flexDir="column"
      borderColor="gray.300"
      rounded="xl"
      p="4"
      color="gray.700"
    >
      <Flex justify="space-between" mb="4">
        <Heading fontSize="2xl">Kategori Detail</Heading>
        <HStack>
          {/* edit button */}
          <Button variant="ghost" colorScheme="green">
            Edit
          </Button>
          {/* delete button */}
          <Button
            variant="ghost"
            colorScheme="red"
            // onClick={() => handleDelete(item.id)}
          >
            Hapus
          </Button>
        </HStack>
      </Flex>

      {/* edit form */}
      <form>
        <FormControl isReadOnly id="category">
          <FormLabel>Kategori</FormLabel>
          <Input type="text" value={props.category.category} />
        </FormControl>

        <Flex justify="flex-end" mt="4">
          <Button display="none">Simpan</Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default CategoryDetail;
