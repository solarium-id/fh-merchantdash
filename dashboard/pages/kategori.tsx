import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  Flex,
  Button,
  Heading,
  IconButton,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { authRouting } from "../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import KategoriTable from "../components/Kategori/Table";
import NewKategori from "../components/Kategori/NewKategori";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import HtmlHead from "../components/HtmlHead";
// api endpoint
const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching data kategori
const getCategory = async (token, page?) => {
  let url = `${endpoint}/api/category?page=${page}`;

  const { data } = await axios.get(url, {
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
    const category = await getCategory(token.jwt, 1);
    // kirimkan data category ke component utama
    return { props: { category } };
  }
};

// component utama KategoriPage
function KategoriPage(props) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  // hooks untuk control modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ambil token dari cookies
  const token = parseCookies();
  // function untuk query data
  const { status, data, isFetching } = useQuery(
    ["category", page],
    () => getCategory(token.jwt, page),
    { initialData: props.category }
  );

  return (
    <>
      <HtmlHead title="Daftar Kategori" />
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
          <Button colorScheme="blue" onClick={onOpen}>
            Tambah Kategori
          </Button>
        </Flex>
        {/* tambah kategori modal */}
        <NewKategori
          token={token.jwt}
          modalControl={{ isOpen, onOpen, onClose }}
        />

        {status === "loading" && (
          <Heading fontSize="xl" my="8">
            Loading
          </Heading>
        )}
        {/* table */}
        {status === "success" && (
          <>
            <KategoriTable
              data={data}
              page={page}
              setPage={setPage}
              isFetching={isFetching}
            />
          </>
        )}
      </Flex>
    </>
  );
}

export default KategoriPage;
