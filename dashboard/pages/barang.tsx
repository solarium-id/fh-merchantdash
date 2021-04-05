import React from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import BarangTable from "../components/Barang/Table";

function BarangPage() {
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
      <BarangTable />
    </Flex>
  );
}

export default BarangPage;
