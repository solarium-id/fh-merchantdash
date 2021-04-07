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
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function KategoriTable({ token, data }) {
  // control konfirmasi modal
  const queryClient = useQueryClient();

  // function untuk hapus kategory
  const delCategoryMutation = useMutation((id) =>
    axios.delete(`${endpoint}/api/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  // menjalankan fungsi delete category
  const handleDelete = (id) => {
    delCategoryMutation.mutate(id, {
      onError: (error) => {
        // ketika gagal
        console.log(error);
      },
      onSuccess: ({ data }) => {
        // ketika berhasil
        // invalidate query dan tutup modal
        queryClient.invalidateQueries("category");
      },
    });
  };
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
                  {/* edit button */}
                  <Link href={`/category/${item.id}`}>
                    <Button variant="ghost" colorScheme="green">
                      Detail
                    </Button>
                  </Link>
                  {/* delete button */}
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
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
