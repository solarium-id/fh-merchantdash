import { useState } from "react";
import { Flex, Button, Heading, HStack } from "@chakra-ui/react";
import axios from "axios";
import { authRouting } from "../../lib/authRouting";
import nookies, { parseCookies } from "nookies";
import type { GetServerSideProps } from "next";
import DeleteMerchant from "../../components/Merchant/DeleteMerchant";
import EditMerchantForm from "../../components/Merchant/EditMerchantForm";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

// fungsi untuk fetching detail data Merchant
const getMerchantDetail = async (token, id) => {
  const { data } = await axios.get(`${endpoint}/api/merchant/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
// fungsi untuk fetching data kategori
const getCategory = async (token) => {
  const { data } = await axios.get(`${endpoint}/api/category`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// server side rendering untuk mendapatkan detail Merchant
// dan memeriksa status login
export const getServerSideProps: GetServerSideProps = async (context) => {
  // cek login token
  const result = authRouting(context);
  if (result !== "") {
    // jika belum login maka akan diredirect ke halaman login
    return { redirect: { destination: result, permanent: false } };
  } else {
    // ambil id merchant dari url
    const merchantId = context.params.id;
    // ambil token dari cookies
    const token = nookies.get(context);
    // get data detail merchant
    const merchant = await getMerchantDetail(token.jwt, merchantId);
    const category = await getCategory(token.jwt);
    // kirimkan data merchant ke component utama
    return { props: { merchant, category } };
  }
};

// Component Utama
function CategoryDetail({ merchant, category }) {
  const [isEditing, setIsEditing] = useState(false);
  const token = parseCookies();

  return (
    <Flex
      border="1px"
      flexDir="column"
      borderColor="gray.300"
      rounded="xl"
      p="4"
      mb="4"
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
          <DeleteMerchant id={merchant.id} token={token.jwt} />
        </HStack>
      </Flex>

      <EditMerchantForm
        merchant={merchant}
        category={category}
        token={token.jwt}
        edit={{ isEditing, setIsEditing }}
      />
    </Flex>
  );
}

export default CategoryDetail;
