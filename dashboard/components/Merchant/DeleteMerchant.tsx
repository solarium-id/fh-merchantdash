import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function DeleteMerchant({ id, token }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // function untuk hapus merchant
  const delMerchantMutation = useMutation((id) =>
    axios.delete(`${endpoint}/api/merchant/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  // menjalankan fungsi delete merchant
  const handleDelete = () => {
    delMerchantMutation.mutate(id, {
      onError: (error) => {
        // ketika gagal
        console.log(error);
      },
      onSuccess: ({ data }) => {
        // ketika berhasil
        // invalidate query dan tutup modal
        queryClient.invalidateQueries("merchant");
        router.push("/merchant");
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

export default DeleteMerchant;
