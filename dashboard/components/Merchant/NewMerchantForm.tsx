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
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import MerchantPicForm from "./MerchantPicForm";
import FotoKtpForm from "./FotoKtpForm";
import { useRouter } from "next/router";

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function NewMerchantForm({ category, token }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [merchantImg, setMerchantImg] = useState("");
  const [KTPImg, setKTPImg] = useState("");
  const [newMerchant, setNewMerchant] = useState({
    merchantname: "",
    merchantaddr: "",
    merchantph: "",
    merchantemail: "",
    categoryid: 0,
    ownername: "",
    ownerhp: "",
    owneremail: "",
    reservation: "",
  });

  // function untuk menambah kategory
  const newMerchantMutation = useMutation((newMerchant) =>
    axios.post(`${endpoint}/api/merchant`, newMerchant, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submitData = {
      ...newMerchant,
      reservation: Number(newMerchant.reservation),
      merchantpic: merchantImg,
      fotoktp: KTPImg,
    };

    newMerchantMutation.mutate(
      // @ts-ignore
      submitData,
      {
        onError: (error) => {
          // ketika gagal
          console.log(error);
          setIsLoading(false);
        },
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries("merchant");
          router.push("/merchant");
          setMerchantImg("");
          setKTPImg("");
          setNewMerchant({
            merchantname: "",
            merchantaddr: "",
            merchantph: "",
            merchantemail: "",
            categoryid: 0,
            ownername: "",
            ownerhp: "",
            owneremail: "",
            reservation: "",
          });
          setIsLoading(false);
        },
      }
    );
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
                categoryid: Number(e.target.value),
              })
            }
            placeholder="Pilih Kategori"
          >
            {category.categories.map((cat) => (
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
          name="reservation"
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
      <MerchantPicForm
        setMerchantImg={setMerchantImg}
        isEditing={true}
        token={token}
      />
      {/* fotoktp */}
      <FotoKtpForm setKTPImg={setKTPImg} isEditing={true} token={token} />

      <Flex justify="end" mt="4">
        <Link href="/merchant">
          <Button mr="2">Batal</Button>
        </Link>
        <Button
          isLoading={isLoading}
          disabled={
            merchantImg === "" && KTPImg === "" && newMerchant.categoryid === 0
          }
          type="submit"
          colorScheme="blue"
        >
          Simpan
        </Button>
      </Flex>
    </form>
  );
}

export default NewMerchantForm;
