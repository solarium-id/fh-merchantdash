import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Flex, Button, Heading } from "@chakra-ui/react";
import MerchantTable from "../components/Merchant/Table";

// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;
// jwt token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3Njc4MjI4LCJleHAiOjE2MTgyODMwMjh9.VXp8MisL0yrRrtEnRHI4HJ8zs9CFJbP0eqwvtGcOw3M";

// fungsi untuk fetching data kategori
const getMerchant = async () => {
  const { data } = await axios.get(`${endpoint}/api/merchant`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// server side rendering untuk menjalankan getMerchant
// dan memeriksa status login
export const getServerSideProps = async () => {
  const merchant = await getMerchant();

  return { props: { merchant } };
};

// component utama MerchantPage
function MerchantPage(props) {
  const merchant = useQuery("merchant", getMerchant, {
    initialData: props.merchant,
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
      {merchant.isSuccess && <MerchantTable data={merchant.data} />}
    </Flex>
  );
}

export default MerchantPage;
