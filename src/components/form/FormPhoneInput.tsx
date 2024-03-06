import { FormInputProps } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

const FormPhoneInput = ({ form, label, name }: FormInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleOnChange = (value: string, ) => {
    setPhoneNumber(value);
  };

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className=" pl-0 flex items-center font-semibold text-base">
            {label}
          </FormLabel>

          <FormControl>
            <PhoneInput
              country={'uz'}
              value={phoneNumber}
              onChange={(value) => {
                handleOnChange(value);
                field.onChange(value);
              }}
              inputStyle={{ width: "100%" }}
              inputProps={{
                name: "phoneNumber",
                id: "phoneNumber",
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPhoneInput;
