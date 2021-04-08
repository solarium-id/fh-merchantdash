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

interface PropsTypes {
  merchant: {
    merchantname: string;
    merchantaddr: string;
    merchantph: string;
    merchantemail: string;
    categoryid: number;
    ownername: string;
    ownerhp: string;
    owneremail: string;
    reservation: string;
  };
  category: {
    id: number;
    category: string;
  }[];
  token: string;
}

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function EditMerchantForm({ merchant, category, token }: PropsTypes) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [merchantImg, setMerchantImg] = useState("");
  const [KTPImg, setKTPImg] = useState("");
  const [newMerchant, setNewMerchant] = useState({
    merchantname: merchant.merchantname,
    merchantaddr: merchant.merchantaddr,
    merchantph: merchant.merchantaddr,
    merchantemail: merchant.merchantemail,
    categoryid: merchant.categoryid,
    ownername: merchant.ownername,
    ownerhp: merchant.ownerhp,
    owneremail: merchant.owneremail,
    reservation: merchant.reservation,
  });

  // function untuk menambah kategory
  const newMerchantMutation = useMutation((newMerchant) =>
    axios.post(`${endpoint}/api/merchant`, newMerchant, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  console.log(newMerchant.reservation);

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
        <FormControl isReadOnly isRequired id="merchantname">
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
        <FormControl isReadOnly isRequired id="merchantaddr">
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
        <FormControl isReadOnly isRequired id="merchantph">
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
        <FormControl isReadOnly isRequired id="merchantemail">
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
        <FormControl isReadOnly isRequired id="categoryid">
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
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </Select>
        </FormControl>
        {/* ownername */}
        <FormControl isReadOnly isRequired id="ownername">
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
        <FormControl isReadOnly isRequired id="ownerhp">
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
        <FormControl isReadOnly isRequired id="owneremail">
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
      <FormControl isReadOnly isRequired mt="4" id="reservation">
        <FormLabel>Status Reservasi</FormLabel>
        <RadioGroup
          name="reservation"
          value={String(newMerchant.reservation)}
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
        <Button isLoading={isLoading} type="submit" colorScheme="blue">
          Simpan
        </Button>
      </Flex>
    </form>
  );
}

export default EditMerchantForm;
