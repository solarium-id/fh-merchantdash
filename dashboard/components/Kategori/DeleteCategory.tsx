import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function DeleteCategory({ id, token }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // function untuk hapus kategory
  const delCategoryMutation = useMutation((id) =>
    axios.delete(`${endpoint}/api/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  // menjalankan fungsi delete category
  const handleDelete = () => {
    delCategoryMutation.mutate(id, {
      onError: (error) => {
        // ketika gagal
        console.log(error);
      },
      onSuccess: ({ data }) => {
        // ketika berhasil
        // invalidate query dan tutup modal
        queryClient.invalidateQueries("category");
        router.push("/kategori");
      },
    });
  };
  return (
    <>
      <Button colorScheme="red" variant="ghost" onClick={handleDelete}>
        Hapus
      </Button>
    </>
  );
}

export default DeleteCategory;
