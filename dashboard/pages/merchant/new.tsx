import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import NewMerchantForm from "../../components/Merchant/NewMerchantForm";

function NewMerchant() {
  return (
    <Flex
      border="1px"
      flexDir="column"
      borderColor="gray.300"
      rounded="xl"
      p="4"
      color="gray.700"
    >
      <Heading mb="4" fontSize="2xl">
        Tambah Merchant Baru
      </Heading>
      <NewMerchantForm />
    </Flex>
  );
}

export default NewMerchant;
