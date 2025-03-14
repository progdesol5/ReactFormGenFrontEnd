import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// @ts-ignore
const ActionsColumn = ({ row, crudActions, handleEditClick }) => {
  const [selectedRefname, setSelectedRefname] = useState("");

  return (
    <div className="flex flex-col gap-4 w-[200px]">
      {/* ShadCN Select Dropdown */}
      <Select onValueChange={(value) => {
        setSelectedRefname(value);
        handleEditClick(row.original)
      }} disabled={!row.getIsSelected()}>
        <SelectTrigger className="w-full custom-input-color">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-stone-200 dark:bg-stone-700 dark:text-white text-stone-800">
          {crudActions.map((action: any) => (
            <SelectItem key={action.MYREFID} value={action.REFNAME1} className="hover:bg-stone-300 dark:hover:bg-stone-800 transition-colors cursor-pointer dark:focus:bg-stone-800 focus:bg-stone-300">
              {action.REFNAME1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActionsColumn;
