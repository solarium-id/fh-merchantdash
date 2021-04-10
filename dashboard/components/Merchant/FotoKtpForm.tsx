import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/outline";

interface PropsTypes {
  token?: string;
  setKTPImg: any;
  KTPImg?: string;
  isEditing?: any;
}

const cloudinaryEndpoint = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

function FotoKtpForm({ token, setKTPImg, KTPImg, isEditing }: PropsTypes) {
  const [file, setFile] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onClick = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ktp_upload");

    try {
      const res = await axios.post(
        `${cloudinaryEndpoint}/image/upload`,
        formData
      );

      setUploadedImage(res.data.eager[0].secure_url);
      setKTPImg(res.data.secure_url);

      setIsLoading(false);
      setIsSubmitted(true);
      console.log(res.data);
    } catch (error) {
      setIsLoading(false);
      setIsSubmitted(false);
      console.log(error);
    }
  };

  return (
    <>
      <FormControl isRequired mt="4" id="merchantpic">
        <FormLabel>Foto KTP</FormLabel>
        {isEditing && (
          <Flex mb="4" alignItems="center">
            <input type="file" name="file" onChange={handleChange} />
            <Flex ml="4" alignItems="center">
              {isSubmitted && (
                <CheckIcon
                  style={{ height: "2rem", width: "2rem", color: "green" }}
                />
              )}
              <Button
                ml="2"
                isLoading={isLoading}
                onClick={onClick}
                variant="outline"
              >
                Upload Foto KTP
              </Button>
            </Flex>
          </Flex>
        )}
        <img
          style={{ maxWidth: "24rem", border: "1px solid #888" }}
          src={KTPImg || uploadedImage}
        />
      </FormControl>
    </>
  );
}

export default FotoKtpForm;
