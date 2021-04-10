import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import NewMerchantForm from "../../components/Merchant/NewMerchantForm";
import axios from "axios";
import { authRouting } from "../../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import HtmlHead from "../../components/HtmlHead";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching data kategori
const getCategory = async (token) => {
  const { data } = await axios.get(`${endpoint}/api/category`, {
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
    // ambil token dari cookies
    const token = nookies.get(context);
    // get data detail category
    const category = await getCategory(token.jwt);
    // kirimkan data category ke component utama
    return { props: { category } };
  }
};

function NewMerchant({ category }) {
  const token = parseCookies();

  return (
    <>
      <HtmlHead title="Merchant Baru" />
      <Flex
        border="1px"
        flexDir="column"
        borderColor="gray.300"
        rounded="xl"
        p="4"
        mb="4"
        color="gray.700"
      >
        <Heading mb="4" fontSize="2xl">
          Tambah Merchant Baru
        </Heading>
        <NewMerchantForm category={category} token={token.jwt} />
      </Flex>
    </>
  );
}

export default NewMerchant;
