import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import KategoriTable from "../components/Kategori/Table";

// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching data kategori
const getCategory = async (token) => {
  const { data } = await axios.get(`${endpoint}/api/category`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// server side rendering untuk menjalankan getCategory
// dan memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  if (result !== "") {
    // jika belum login maka akan diredirect ke halaman login
    return { redirect: { destination: result, permanent: false } };
  } else {
    // ambil token dari cookies
    const token = nookies.get(context);
    // get data category
    const category = await getCategory(token.jwt);
    // kirimkan data category ke component utama
    return { props: { category } };
  }
};

// component utama KategoriPage
function KategoriPage(props) {
  // ambil token dari cookies
  const token = parseCookies();
  const category = useQuery("category", () => getCategory(token.jwt), {
    initialData: props.category,
  });

  return (
    <Flex
      border="1px"
      flexDir="column"
      borderColor="gray.300"
      rounded="xl"
      p="4"
      color="gray.700"
    >
      {/* page heading */}
      <Flex justify="space-between" align="center" mb="4">
        <Heading fontSize="xl">Tabel Kategori</Heading>
        {/* tambah button */}
        <Button colorScheme="blue">Tambah Kategori</Button>
      </Flex>
      {/* table */}
      {category.isSuccess && <KategoriTable data={category.data} />}
    </Flex>
  );
}

export default KategoriPage;
