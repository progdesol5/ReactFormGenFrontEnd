import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import CreateRefTable from './createNewRefModal';

// @ts-ignore
const FieldPopOver = ({ fieldKey, dataType, handleTypeChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isSearchValueNotFound =
    searchValue &&
    !dataType?.some((option: any) => option.REFNAME1?.toLowerCase().includes(searchValue.toLowerCase()));


  return (
    <div className="flex gap-6 items-baseline flex-wrap lg:flex-nowrap">
      <label className="form-label max-w-32" htmlFor={fieldKey}>
        {fieldKey}
      </label>
      <div className="flex flex-col w-full gap-1">
        <Popover open={open} onOpenChange={(value) => setOpen(value)}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between custom-input-color"
            >
              {selectedValue
                ? (dataType?.find((option: any) => option.REFNAME1 === selectedValue)?.REFNAME1)
                : `Select ${fieldKey}`}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Command>
              <div className='flex items-center justify-between pr-3'>
                <CommandInput
                  placeholder={`Search ${fieldKey}...`}
                  className="h-9"
                  onValueChange={(value) => setSearchValue(value)}
                />
                <PlusCircle
                  className={cn(
                    "text-stone-400 hover:opacity-50 transition-colors",
                    isSearchValueNotFound || !searchValue ? "cursor-pointer" : "opacity-50 cursor-not-allowed",
                    fieldKey === "FIELDTEMPLATE" ? "hidden" : ""
                  )}
                  size={24}
                  onClick={() => {
                    if (isSearchValueNotFound || !searchValue) setSheetOpen(true);
                  }}
                />
              </div>
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup className=''>
                  {dataType?.sort().map((option: any) => (
                    <CommandItem
                      key={option.MYREFID}
                      value={option.REFNAME1}
                      className=""
                      onSelect={(value) => {
                        handleTypeChange(fieldKey, value, dataType);
                        setOpen(false);
                        setSelectedValue(value);
                        setSearchValue('');
                      }}
                    >
                      {option.REFNAME1}
                      <Check
                        className={cn(
                          "ml-auto text-stone-400",
                          selectedValue === option.REFNAME1 ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Add the plus icon and Sheet component */}
        <div className="flex items-center mt-2">
          <CreateRefTable
            fieldKey={fieldKey}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
            searchValue={searchValue}
          />
        </div>
      </div>
    </div>
  )
}

export default FieldPopOver