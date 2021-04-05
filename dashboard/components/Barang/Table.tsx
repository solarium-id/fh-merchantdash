import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";

function BarangTable() {
  return (
    <Table variant="simple" size="sm">
      <TableCaption>Kategori Table</TableCaption>
      <Thead>
        <Tr>
          <Th>Nama Barang</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Sejarah Islam di Indonesia</Td>
          <Td>
            <Button variant="ghost" colorScheme="green">
              Edit
            </Button>
            <Button variant="ghost" colorScheme="red">
              Hapus
            </Button>
          </Td>
        </Tr>
        <Tr>
          <Td>Garis Waktu</Td>
          <Td>
            <Button variant="ghost" colorScheme="green">
              Edit
            </Button>
            <Button variant="ghost" colorScheme="red">
              Hapus
            </Button>
          </Td>
        </Tr>
        <Tr w="20%">
          <Td>Homo Diens</Td>
          <Td>
            <Button variant="ghost" colorScheme="green">
              Edit
            </Button>
            <Button variant="ghost" colorScheme="red">
              Hapus
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default BarangTable;
