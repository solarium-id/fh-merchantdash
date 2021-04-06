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

function MerchantTable({ data }) {
  console.log(data);

  return (
    <Table variant="simple" size="sm">
      <TableCaption>Kategori Table</TableCaption>
      <Thead>
        <Tr>
          <Th>Nama Merchant</Th>
          <Th>Kategori</Th>
          <Th>Nama Owner</Th>
          <Th>Alamat Merchant</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            <Td>{item.merchantname}</Td>
            <Td>{item.category.category}</Td>
            <Td>{item.ownername}</Td>
            <Td>{item.merchantaddr}</Td>
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

export default MerchantTable;
