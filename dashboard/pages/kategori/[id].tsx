import React, { useState } from "react";
import {
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { authRouting } from "../../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import DeleteCategory from "../../components/Kategori/DeleteCategory";
import EditCategory from "../../components/Kategori/EditCategory";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching detail data kategori
const getCategoryDetail = async (token, id) => {
  const { data } = await axios.get(`${endpoint}/api/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
// server side rendering untuk mendapatkan detail kategori
// dan memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  if (result !== "") {
    // jika belum login maka akan diredirect ke halaman login
    return { redirect: { destination: result, permanent: false } };
  } else {
    // ambil id category dari url
    const categoryId = context.params.id;
    // ambil token dari cookies
    const token = nookies.get(context);
    // get data detail category
    const category = await getCategoryDetail(token.jwt, categoryId);
    // kirimkan data category ke component utama
    return { props: { category } };
  }
};

// Component Utama
function CategoryDetail({ category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(category.category);

  const token = parseCookies();

  return (
    <Flex
      border="1px"
      flexDir="column"
      borderColor="gray.300"
      rounded="xl"
      p="4"
      color="gray.700"
    >
      <Flex justify="space-between" mb="4">
        <Heading fontSize="2xl">Kategori Detail</Heading>
        <HStack>
          {/* edit button */}
          <Button
            variant="ghost"
            colorScheme="green"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          {/* delete button */}
          <DeleteCategory id={category.id} token={token.jwt} />
        </HStack>
      </Flex>

      {/* edit form */}
      <form>
        <FormControl id="category" isReadOnly={!isEditing}>
          <FormLabel>Kategori</FormLabel>
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </FormControl>

        <Flex mt="4" display={!isEditing && "none"}>
          <Button
            mr="4"
            onClick={() => {
              setIsEditing(false);
              setNewCategory(category.category);
            }}
          >
            Batal
          </Button>
          {/* simpan edit kategori */}
          <EditCategory
            id={category.id}
            token={token.jwt}
            newCategory={newCategory}
          />
        </Flex>
      </form>
    </Flex>
  );
}

export default CategoryDetail;
