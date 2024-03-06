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
  const [values, setValues] = useState([0,300])  
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
              max={300}
              step={1}
              onValueChange={(newValues) => {
                setValues(newValues)
                field.onChange(newValues || values)
              } 
              }
            />
          </FormControl>
          <div className="pt-4">
            Selected Range: ${values[0]} - ${values[1]}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSlider;
