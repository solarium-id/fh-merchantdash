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
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import MerchantPicForm from "./MerchantPicForm";
import FotoKtpForm from "./FotoKtpForm";
import { useRouter } from "next/router";

interface PropsTypes {
  merchant: {
    id: string;
    merchantname: string;
    merchantaddr: string;
    merchantph: string;
    merchantemail: string;
    categoryid: number;
    ownername: string;
    ownerhp: string;
    owneremail: string;
    reservation: string;
    merchantpic: string;
    fotoktp: string;
  };
  category: {
    pageItems: number;
    currentPage: number | null;
    totalPage: number;
    categories: {
      id: number;
      category: string;
    }[];
  };
  token: string;
  edit: any;
}

const endpoint = process.env.NEXT_PUBLIC_API_URL;

function EditMerchantForm({ merchant, category, token, edit }: PropsTypes) {
  const defaultMerchant = {
    merchantname: merchant.merchantname,
    merchantaddr: merchant.merchantaddr,
    merchantph: merchant.merchantaddr,
    merchantemail: merchant.merchantemail,
    categoryid: merchant.categoryid,
    ownername: merchant.ownername,
    ownerhp: merchant.ownerhp,
    owneremail: merchant.owneremail,
    reservation: merchant.reservation,
  };
  const selectedCategory = category.categories.filter(
    (cat) => cat.id == defaultMerchant.categoryid
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [merchantImg, setMerchantImg] = useState(merchant.merchantpic);
  const [KTPImg, setKTPImg] = useState(merchant.fotoktp);
  const [newMerchant, setNewMerchant] = useState(defaultMerchant);

  // function untuk menambah merchant
  const editMerchantMutation = useMutation((newMerchant) =>
    axios.patch(`${endpoint}/api/merchant/${merchant.id}`, newMerchant, {
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

    editMerchantMutation.mutate(
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
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid columns={2} spacing={4}>
        {/* merchantname */}
        <FormControl isReadOnly={!edit.isEditing} isRequired id="merchantname">
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
        <FormControl isReadOnly={!edit.isEditing} isRequired id="merchantaddr">
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
        <FormControl isReadOnly={!edit.isEditing} isRequired id="merchantph">
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
        <FormControl isReadOnly={!edit.isEditing} isRequired id="merchantemail">
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
          {edit.isEditing ? (
            <Select
              isReadOnly={true}
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
          ) : (
            <Input isReadOnly={true} value={selectedCategory[0].category} />
          )}
        </FormControl>
        {/* ownername */}
        <FormControl isReadOnly={!edit.isEditing} isRequired id="ownername">
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
        <FormControl isReadOnly={!edit.isEditing} isRequired id="ownerhp">
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
        <FormControl isReadOnly={!edit.isEditing} isRequired id="owneremail">
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
          value={String(newMerchant.reservation)}
          onChange={(e) =>
            setNewMerchant({
              ...newMerchant,
              reservation: e,
            })
          }
        >
          <Stack direction="row">
            <Radio isReadOnly={!edit.isEditing} value="1">
              Ya
            </Radio>
            <Radio isReadOnly={!edit.isEditing} value="0">
              Tidak
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* merchantpic */}
      <MerchantPicForm
        setMerchantImg={setMerchantImg}
        token={token}
        merchantImg={merchantImg}
        isEditing={edit.isEditing}
      />
      {/* fotoktp */}
      <FotoKtpForm
        setKTPImg={setKTPImg}
        token={token}
        KTPImg={KTPImg}
        isEditing={edit.isEditing}
      />

      <Flex justify="end" mt="8" display={!edit.isEditing && "none"}>
        <Button
          mr="4"
          onClick={() => {
            edit.setIsEditing(false);
            setNewMerchant(defaultMerchant);
          }}
        >
          Batal
        </Button>
        <Button isLoading={isLoading} type="submit" colorScheme="blue">
          Simpan
        </Button>
      </Flex>
    </form>
  );
}

export default EditMerchantForm;
