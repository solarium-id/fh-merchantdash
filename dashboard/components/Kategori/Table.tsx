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
import Link from "next/link";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

function KategoriTable({ data, page, setPage, isFetching }) {
  return (
    <>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Nama Kategori</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.categories.map((item) => (
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
    </>
  );
}

export default KategoriTable;
