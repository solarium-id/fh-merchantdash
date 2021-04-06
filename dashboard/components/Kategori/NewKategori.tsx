import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function NewKategori({ modalControl, token }) {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function untuk menambah kategory
  const newCategoryMutation = useMutation((newCategory) =>
    axios.post(`${endpoint}/api/category`, newCategory, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  const handleSave = () => {
    setIsLoading(true);

    // jalankan function menambah category
    newCategoryMutation.mutate(
      // @ts-ignore
      { category: newCategory },
      {
        onError: (error) => {
          // ketika gagal
          console.log(error);
          setIsLoading(false);
        },
        onSuccess: ({ data }) => {
          // ketika berhasil
          // invalidate query dan tutup modal
          queryClient.invalidateQueries("category");
          modalControl.onClose();
          setNewCategory("");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <>
      <Modal isOpen={modalControl.isOpen} onClose={modalControl.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="category">
              <FormLabel>Kategori</FormLabel>
              <Input
                type="text"
                placeholder="Kategori baru"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={modalControl.onClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              variant="solid"
              colorScheme="blue"
              onClick={handleSave}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewKategori;
