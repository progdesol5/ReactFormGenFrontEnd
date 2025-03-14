
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateFieldModalProps } from '@/types/tableTypes';
import { tableFieldKeys } from '@/utils';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// @ts-ignore
const CreateFieldModal: React.FC<CreateFieldModalProps> = ({ isOpen, closeModal, onSubmit, tables }) => {
  const [date, setDate] = React.useState<Date>()


  const fieldKeys = tableFieldKeys.map((k) =>
    k.key.toLowerCase().replace(/\s+/g, "")
  );

  const [formData, setFormData] = useState<Record<string, string | null>>(
    fieldKeys.reduce((acc, key) => ({ ...acc, [key]: null }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newName = name.toLowerCase().replace(/\s+/g, "")
    setFormData((prev) => ({ ...prev, [newName]: value === "" ? null : value }));
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
    closeModal();
  };

  if (date) {
    console.log(date.toISOString())
  }

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTableChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tablename: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="card max-w-[500px]">
        <div className="card-header">
          <h3 className="card-title">Create Fields</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body scrollable h-[250px] py-0 my-4 pr-4 mr-2">
            <div className="flex flex-col gap-6 items-center">
              {tableFieldKeys.map((field) => {
                const lowerkey = field.key.toLowerCase().replace(/\s+/g, "");

                return (
                  <div className="w-full" key={field.key}>
                    <div className="flex gap-6 items-baseline flex-wrap lg:flex-nowrap">
                      <label className="form-label max-w-32" htmlFor={lowerkey}>
                        {field.key}
                      </label>
                      <div className="flex flex-col w-full gap-1">
                        {field.type === "select" && field.options ? (
                          <Select
                            onValueChange={(value) => handleSelectChange(lowerkey, value)}
                          >
                            <SelectTrigger className="input">
                              <SelectValue placeholder={`Select ${field.key}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === "date" ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        ) : lowerkey === "tablename" ? (
                          <Select
                            onValueChange={(value) => handleTableChange(value)}
                          >
                            <SelectTrigger className="input">
                              <SelectValue placeholder={`Select Table`} />
                            </SelectTrigger>
                            <SelectContent>
                              {tables?.map((table) => (
                                <SelectItem key={table} value={table}>
                                  {table}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <input
                            className="input"
                            type={field.type}
                            id={lowerkey}
                            name={lowerkey}
                            value={formData[lowerkey] ?? ""}
                            onChange={handleChange}
                            placeholder={`Enter ${field.key}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="card-footer justify-center">
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-outline btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateFieldModal };

