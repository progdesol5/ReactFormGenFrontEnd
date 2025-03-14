import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTables } from "@/providers";
import { CreateRefDefaultValue, createRefTableFunc, fieldGeneratorType, generateRandom4Digit, getControlType, getFieldValidation } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  REFNAME1: z.string().min(3, "REFNAME1 must be at least 3 characters."),
  REFNAME2: z.string().nonempty("REFNAME2 is required."),
  REFNAME3: z.string().max(100, "REFNAME3 must not exceed 100 characters.").optional(),
  SHORTNAME: z.string(),
  REMARKS: z.string().max(200, "REMARKS must not exceed 200 characters.").optional(),
});

// @ts-ignore
const CreateRefTable = ({ fieldKey, sheetOpen, setSheetOpen, searchValue }) => {
  const { setControlType, setFieldValidation } = useTables();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      REFNAME1: searchValue || "",
      REFNAME2: "",
      REFNAME3: "",
      SHORTNAME: "",
      REMARKS: ""
    },
  });

  const { setValue, watch, reset } = form;
  const refname1Value = watch("REFNAME1");
  const refname2Value = watch("REFNAME2");

  // API call function
  // const handleTranslation = useCallback(async (text: string) => {
  //   if (text) {
  //     try {
  //       const translatedText = await translateToArabic(text);
  //       setValue("REFNAME2", translatedText);
  //       setValue("REFNAME3", `${text} - ${translatedText}`);
  //       setValue("SHORTNAME", text);
  //     } catch (error) {
  //       console.error("Error during translation:", error);
  //     }
  //   }
  // }, [setValue]);

  useEffect(() => {
    if (refname1Value) {
      // setValue("REFNAME2", refname1Value);
      setValue("REFNAME3", `${refname1Value} - ${refname2Value}`);
      setValue("REMARKS", `${refname1Value} - ${refname2Value}`);
      setValue("SHORTNAME", refname1Value);
    }
  }, [setValue, refname1Value, refname2Value]);


  // Update form values if searchValue changes
  useEffect(() => {
    reset((prev) => ({
      ...prev,
      REFNAME1: searchValue || "",
    }));
  }, [searchValue, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const obj = fieldGeneratorType.find((item: any) => item.GENERATORNAME === fieldKey);
    if (obj) {
      const formData = {
        ...CreateRefDefaultValue,
        ...data,
        MYREFID: generateRandom4Digit(),
        REFID: generateRandom4Digit(),
        TENANTID: obj.TENANTID,
        MODULE: obj.MODULE,
        REFTYPE: obj.REFTYPE,
        REFSUBTYPE: obj.REFSUBTYPE,
        ACTIVE: 'Y'
      }
      const res = await createRefTableFunc(formData);
      if (res.status === 200) {
        if (fieldKey === "CONTROLTYPE") {
          const updatedControlType = await getControlType();
          setControlType(updatedControlType)
        } else if (fieldKey === "VALIDATION") {
          const updatedValidation = await getFieldValidation();
          setFieldValidation(updatedValidation)
        }
        setSheetOpen(false);
        toast.success(res.data);
        reset();
      }
    }

  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <span className="hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Reftable</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={(e) => {
            e.stopPropagation();
            return form.handleSubmit(onSubmit)(e);
          }}
            className="space-y-4 mt-4" id="form2">
            {Object.keys(formSchema.shape).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={`Enter ${key}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button className="w-full" form="form2">
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateRefTable;
