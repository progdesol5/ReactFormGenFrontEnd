
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTables } from '@/providers';
import { RefTableItemType } from '@/types/tableTypes';
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import FieldPopOver from './fieldPopOver';
// @ts-ignore
const EditModal = ({ isOpen, closeModal, rowData, onSubmit }) => {
  const [formData, setFormData] = useState(rowData);
  const { controlType, yesNo, fieldTemplate, fieldValidation } = useTables();
  const [date, setDate] = useState<any>()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // @ts-ignore
  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
    closeModal();
  };

  const handleTypeChange = (
    key: string,
    value: string | number,
    dataArray: RefTableItemType[] | null
  ) => {
    const newValObj = dataArray?.find((item: any) => item.REFNAME1 === value);
    setFormData((prev: any) => ({ ...prev, [key]: newValObj?.MYREFID?.toString() }));
  };

  const handleDateChange = (key: string, value: any) => {
    if (value) {
      setFormData((prev: any) => ({ ...prev, [key]: value.toISOString() }));
      setDate(value);
    }
    setIsPopoverOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="card max-w-[500px] w-full">
        <div className="card-header">
          <h3 className="card-title">
            Edit Fields
          </h3>
        </div>
        <form onSubmit={handleSubmit} id='form1'>
          <div className="card-body scrollable h-[250px] py-0 my-4 pr-4 mr-2">
            <div className='flex flex-col gap-6 items-center'>
              {Object.keys(rowData).map((key) => (
                <div className="w-full" key={key}>
                  {key === "CONTROLTYPE" ? (
                    <FieldPopOver
                      fieldKey={key}
                      dataType={controlType}
                      handleTypeChange={handleTypeChange}
                    />
                  ) : key === "PRIMARYKEY" || key === "PRIMARY" || key === "SHOWINLIST" || key === "MENDATORY" || key === "SEARCHALLOW" || key === "ALLOWNULL" ? (
                    <div className="flex gap-6 items-baseline flex-wrap lg:flex-nowrap">
                      <label className="form-label max-w-32" htmlFor={key}>
                        {key}
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <Select
                          onValueChange={(value: any) => handleTypeChange(key, value, yesNo)}
                        >
                          <SelectTrigger className="input custom-input-color">
                            <SelectValue placeholder={`Select ${key}`} className='custom-input-color' />
                          </SelectTrigger>
                          <SelectContent className='bg-stone-200 dark:bg-stone-700 dark:text-white text-stone-800'>
                            {yesNo?.sort().map((option) => (
                              /** 
                               * @todo change the value to the refname1 based on the language change
                               */
                              <SelectItem key={option.MYREFID} value={option.REFNAME1} className='hover:bg-stone-300 dark:hover:bg-stone-800 transition-colors cursor-pointer dark:focus:bg-stone-800 focus:bg-stone-300'>
                                {option.REFNAME1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : key === "FIELDTEMPLATE" ? (
                    <FieldPopOver
                      fieldKey={key}
                      dataType={fieldTemplate}
                      handleTypeChange={handleTypeChange}
                    />
                  ) : key === "VALIDATION" ? (
                    <FieldPopOver
                      fieldKey={key}
                      dataType={fieldValidation}
                      handleTypeChange={handleTypeChange}
                    />
                  ) : key === "SWITCH4" ? (
                    <div className="flex gap-6 items-baseline flex-wrap lg:flex-nowrap ">
                      <label className="form-label max-w-32" htmlFor={key}>
                        {key}
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal custom-input-color",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 custom-input-color" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(value) => handleDateChange(key, value)}
                              initialFocus
                              className='custom-input-color'
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-6 items-baseline flex-wrap lg:flex-nowrap ">
                      <label className="form-label max-w-32" htmlFor={key}>
                        {key}
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        <input
                          className={`input ${!(key === "ID" || key === "TABLENAME" || key === "FORMTEMPLATE" || key === "FIELDTYPE" || key === "DATATYPE") ? "custom-input-color" : "dark:bg-stone-600 dark:opacity-50 dark:text-white"}`}
                          type={key === "SWITCH5" || key === "SWITCH6" || key === "SORTNUMBER" ? "number" : "text"}
                          id={key}
                          name={key}
                          disabled={key === "ID" || key === "TABLENAME" || key === "FORMTEMPLATE" || key === "FIELDTYPE" || key === "DATATYPE"}
                          value={formData[key] || ""}
                          onChange={handleFieldChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          <div className="card-footer justify-center">
            <div className="flex justify-between gap-4">
              <button type="button" onClick={closeModal} className="btn btn-sm btn-outline btn-secondary">Cancel</button>
              <button className="btn btn-sm btn-primary" form='form1'>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditModal };

