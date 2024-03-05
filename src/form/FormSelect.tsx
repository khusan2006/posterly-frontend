import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select";
import { FormSelectProps } from "@/lib/types";

const FormSelect = ({ form, label, data, name }: FormSelectProps<string[]>) => {  
  return (
    <>
      <FormField
        control={form?.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" pl-0 flex items-center font-semibold text-base">
              {label}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((item) => (
                  <SelectItem value={item || 'default'}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormSelect;