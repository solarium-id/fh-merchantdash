import React from "react";
import {
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Radio,
  RadioGroup,
  Stack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

function NewMerchantForm() {
  return (
    <form>
      <SimpleGrid columns={2} spacing={4}>
        {/* merchantname */}
        <FormControl id="merchantname">
          <FormLabel>Nama Merchant</FormLabel>
          <Input type="text" placeholder="Nama Merchant" />
        </FormControl>
        {/* merchantaddr */}
        <FormControl id="merchantaddr">
          <FormLabel>Alamat Merchant</FormLabel>
          <Input type="text" placeholder="Alamat Merchant" />
        </FormControl>
        {/* merchantph */}
        <FormControl id="merchantph">
          <FormLabel>No Telp Merchant</FormLabel>
          <Input type="text" placeholder="08xxxx" />
        </FormControl>
        {/* merchantemail */}
        <FormControl id="merchantemail">
          <FormLabel>Alamat Email Merchant</FormLabel>
          <Input type="text" placeholder="example@email.com" />
        </FormControl>

        {/* categoryid */}
        <FormControl id="categoryid">
          <FormLabel>Kategori</FormLabel>
          <Select placeholder="Pilih Kategori">
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </Select>
        </FormControl>
        {/* ownername */}
        <FormControl id="ownername">
          <FormLabel>Nama Owner</FormLabel>
          <Input type="text" placeholder="Nama Owner" />
        </FormControl>
        {/* ownerhp */}
        <FormControl id="ownerhp">
          <FormLabel>No Telp Merchant</FormLabel>
          <Input type="text" placeholder="08xxxx" />
        </FormControl>
        {/* owneremail */}
        <FormControl id="owneremail">
          <FormLabel>Alamat Email Owner</FormLabel>
          <Input type="text" placeholder="example@email.com" />
        </FormControl>
      </SimpleGrid>

      {/* reservation */}
      <FormControl mt="4" id="reservation">
        <FormLabel>Status Reservasi</FormLabel>
        <RadioGroup>
          <Stack direction="row">
            <Radio value="1">Ya</Radio>
            <Radio value="2">Tidak</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* merchantpic */}
      <FormControl mt="4" id="merchantpic">
        <FormLabel>Foto Merchant</FormLabel>
        <input type="file" />
      </FormControl>
      {/* fotoktp */}
      <FormControl mt="4" id="merchantpic">
        <FormLabel>Foto KTP</FormLabel>
        <input type="file" />
      </FormControl>

      <Flex justify="end" mt="4">
        <Link href="/merchant">
          <Button mr="2">Batal</Button>
        </Link>
        <Button colorScheme="blue">Simpan</Button>
      </Flex>
    </form>
  );
}

export default NewMerchantForm;
