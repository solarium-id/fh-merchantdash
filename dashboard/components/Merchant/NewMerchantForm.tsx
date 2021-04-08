import React, { useState } from "react";
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
import MerchantPicForm from "./MerchantPicForm";
import FotoKtpForm from "./FotoKtpForm";

function NewMerchantForm({ category, token }) {
  const [merchantImg, setMerchantImg] = useState("");
  const [KTPImg, setKTPImg] = useState("");
  const [newMerchant, setNewMerchant] = useState({
    merchantname: "",
    merchantaddr: "",
    merchantph: "",
    merchantemail: "",
    categoryid: "",
    ownername: "",
    ownerhp: "",
    owneremail: "",
    reservation: "",
  });

  console.log(newMerchant.reservation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...newMerchant,
      merchantpic: merchantImg,
      fotoKtp: KTPImg,
    };

    console.log(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid columns={2} spacing={4}>
        {/* merchantname */}
        <FormControl isRequired id="merchantname">
          <FormLabel>Nama Merchant</FormLabel>
          <Input
            value={newMerchant.merchantname}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                merchantname: e.target.value,
              })
            }
            type="text"
            placeholder="Nama Merchant"
          />
        </FormControl>
        {/* merchantaddr */}
        <FormControl isRequired id="merchantaddr">
          <FormLabel>Alamat Merchant</FormLabel>
          <Input
            value={newMerchant.merchantaddr}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                merchantaddr: e.target.value,
              })
            }
            type="text"
            placeholder="Alamat Merchant"
          />
        </FormControl>
        {/* merchantph */}
        <FormControl isRequired id="merchantph">
          <FormLabel>No Telp Merchant</FormLabel>
          <Input
            value={newMerchant.merchantph}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                merchantph: e.target.value,
              })
            }
            type="text"
            placeholder="08xxxx"
          />
        </FormControl>
        {/* merchantemail */}
        <FormControl isRequired id="merchantemail">
          <FormLabel>Alamat Email Merchant</FormLabel>
          <Input
            value={newMerchant.merchantemail}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                merchantemail: e.target.value,
              })
            }
            type="text"
            placeholder="example@email.com"
          />
        </FormControl>

        {/* categoryid */}
        <FormControl isRequired id="categoryid">
          <FormLabel>Kategori</FormLabel>
          <Select
            value={newMerchant.categoryid}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                categoryid: e.target.value,
              })
            }
            placeholder="Pilih Kategori"
          >
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </Select>
        </FormControl>
        {/* ownername */}
        <FormControl isRequired id="ownername">
          <FormLabel>Nama Owner</FormLabel>
          <Input
            value={newMerchant.ownername}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                ownername: e.target.value,
              })
            }
            type="text"
            placeholder="Nama Owner"
          />
        </FormControl>
        {/* ownerhp */}
        <FormControl isRequired id="ownerhp">
          <FormLabel>No Telp Merchant</FormLabel>
          <Input
            value={newMerchant.ownerhp}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                ownerhp: e.target.value,
              })
            }
            type="text"
            placeholder="08xxxx"
          />
        </FormControl>
        {/* owneremail */}
        <FormControl isRequired id="owneremail">
          <FormLabel>Alamat Email Owner</FormLabel>
          <Input
            value={newMerchant.owneremail}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                owneremail: e.target.value,
              })
            }
            type="text"
            placeholder="example@email.com"
          />
        </FormControl>
      </SimpleGrid>

      {/* reservation */}
      <FormControl isRequired mt="4" id="reservation">
        <FormLabel>Status Reservasi</FormLabel>
        <RadioGroup
          value={newMerchant.reservation}
          onChange={(e) =>
            setNewMerchant({
              ...newMerchant,
              reservation: e,
            })
          }
        >
          <Stack direction="row">
            <Radio value="1">Ya</Radio>
            <Radio value="0">Tidak</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* merchantpic */}
      <MerchantPicForm setMerchantImg={setMerchantImg} token={token} />
      {/* fotoktp */}
      <FotoKtpForm setKTPImg={setKTPImg} token={token} />

      <Flex justify="end" mt="4">
        <Link href="/merchant">
          <Button mr="2">Batal</Button>
        </Link>
        <Button type="submit" colorScheme="blue">
          Simpan
        </Button>
      </Flex>
    </form>
  );
}

export default NewMerchantForm;
