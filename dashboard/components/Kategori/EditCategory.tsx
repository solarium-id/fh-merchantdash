import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function EditCategory({ id, token, newCategory }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const editCategoryMutation = useMutation(({ newCategory, id }: any) =>
    axios.patch(
      `${endpoint}/api/category/${id}`,
      { category: newCategory },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );

  // menjalankan fungsi edit category
  const handleEdit = () => {
    editCategoryMutation.mutate(
      { newCategory, id },
      {
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
      }
    );
  };

  return (
    <>
      <Button colorScheme="blue" onClick={handleEdit}>
        Simpan
      </Button>
    </>
  );
}

export default EditCategory;
