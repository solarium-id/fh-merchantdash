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

function KategoriTable() {
  return (
    <Table variant="simple" size="sm">
      <TableCaption>Kategori Table</TableCaption>
      <Thead>
        <Tr>
          <Th>Nama Kategori</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Sejarah</Td>
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
          <Td>Novel</Td>
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
          <Td>Non Fiksi</Td>
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

export default KategoriTable;
