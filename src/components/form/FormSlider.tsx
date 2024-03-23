import { FormSliderProps } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Slider } from "../ui/slider";
import { useState } from "react";

const FormSlider = ({ form, name, label }: FormSliderProps) => {
  const [values, setValues] = useState([0,150])  
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
            <Slider
              defaultValue={values}
              max={150}
              step={1}
              onValueChange={(newValues) => {
                setValues(newValues)
                field.onChange(newValues || values)
              } 
              }
            />
          </FormControl>
          <div className="pt-4">
            Selected Range: {values[0]} тыс - {values[1]} тыс
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSlider;
