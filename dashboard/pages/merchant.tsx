import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import MerchantTable from "../components/Merchant/Table";
import Link from "next/link";

// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching data Merchant
const getMerchant = async (jwt) => {
  const { data } = await axios.get(`${endpoint}/api/merchant`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return data;
};

// server side rendering untuk menjalankan getMerchant
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
    // get data merchant
    const merchant = await getMerchant(token.jwt);
    // kirimkan data merchant ke component utama
    return { props: { merchant } };
  }
};

// component utama MerchantPage
function MerchantPage(props) {
  // ambil token dari cookies
  const token = parseCookies();
  const merchant = useQuery("merchant", () => getMerchant(token.jwt), {
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
        <Heading fontSize="xl">Tabel Merchant</Heading>
        {/* tambah button */}
        <Link href="/merchant/new">
          <Button colorScheme="blue">Tambah Merchant</Button>
        </Link>
      </Flex>
      {/* table */}
      {merchant.isSuccess && <MerchantTable data={merchant.data} />}
    </Flex>
  );
}

export default MerchantPage;
