import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import MerchantTable from "../components/Merchant/Table";
import Link from "next/link";

// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching data Merchant
const getMerchant = async (token, page?) => {
  const { data } = await axios.get(`${endpoint}/api/merchant?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
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
    const merchant = await getMerchant(token.jwt, 1);
    // kirimkan data merchant ke component utama
    return { props: { merchant } };
  }
};

// component utama MerchantPage
function MerchantPage(props) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // ambil token dari cookies
  const token = parseCookies();
  const { status, data, isFetching } = useQuery(
    ["merchant", page],
    () => getMerchant(token.jwt, page),
    {
      initialData: props.merchant,
    }
  );

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

      {status === "loading" && (
        <Heading fontSize="xl" my="8">
          Loading
        </Heading>
      )}
      {/* table */}
      {status === "success" && (
        <MerchantTable
          data={data}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
        />
      )}
    </Flex>
  );
}

export default MerchantPage;
