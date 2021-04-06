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

function KategoriTable({ data }) {
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
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.category}</Td>
            <Td>
              <Button variant="ghost" colorScheme="green">
                Edit
              </Button>
              <Button variant="ghost" colorScheme="red">
                Hapus
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default KategoriTable;
