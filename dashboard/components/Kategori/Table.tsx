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

function KategoriTable({ data }) {
  return (
    <>
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
            <React.Fragment key={item.id}>
              <Tr>
                <Td>{item.category}</Td>
                <Td>
                  {/* Detail button */}
                  <Link href={`/kategori/${item.id}`}>
                    <Button variant="ghost" colorScheme="green">
                      Detail
                    </Button>
                  </Link>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default KategoriTable;
