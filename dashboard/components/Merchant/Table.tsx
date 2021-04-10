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
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function MerchantTable({ data, page, setPage, isFetching }) {
  return (
    <Table variant="simple" size="sm">
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
        {data.merchants.map((item) => (
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
      <TableCaption>
        <ButtonGroup isAttached mx="3" variant="outline">
          <IconButton
            aria-label="prev"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            icon={
              <ChevronDoubleLeftIcon
                style={{ height: "1.25rem", width: "1.25rem" }}
              />
            }
          />
          <Button>{page}</Button>
          <IconButton
            aria-label="next"
            onClick={() => setPage(page + 1)}
            disabled={page == data.totalPage}
            icon={
              <ChevronDoubleRightIcon
                style={{ height: "1.25rem", width: "1.25rem" }}
              />
            }
          />
        </ButtonGroup>
        {/* {isFetching ? <span> Loading...</span> : null} */}
      </TableCaption>
    </Table>
  );
}

export default MerchantTable;
