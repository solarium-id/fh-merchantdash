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
import Link from "next/link";

function MerchantTable({ data }) {
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
              <Link href={`/merchant/${item.id}`}>
                <Button variant="ghost" colorScheme="green">
                  Detail
                </Button>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default MerchantTable;
