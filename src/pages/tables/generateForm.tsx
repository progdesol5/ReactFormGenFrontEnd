import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTables } from "@/providers";
import { TableField } from "@/types/tableTypes";
import { findLnagName, findRefName } from "@/utils";
import { useState } from "react";
import ActionsColumn from "./ActionsColumns";

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}





const GenerateForm = () => {
  const location = useLocation();
  const selectedRows = location.state?.rows || [];
  const { tableSchema, setTableSchema, fetchTableSchema, controlType, yesNo, fieldTemplate, fieldValidation, tables, fetchTables, crudActions } = useTables();
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});


  console.log(JSON.stringify(selectedRows))

  const columns: ColumnDef<TableField>[] = [
    {
      accessorKey: "ID",
      header: "Select",
      cell: ({ row }) => (
        <div>
          <input className="checkbox checkbox-sm" data-datatable-check="true" type="checkbox" onChange={() => row.toggleSelected()} checked={row.getIsSelected()} />
        </div>
      )
    },
    {
      accessorKey: "CRUDACTIONS",
      header: "Actions",
      cell: ({ row }) => <ActionsColumn row={row} crudActions={crudActions} handleEditClick={handleEditClick} />
    },
    {
      accessorKey: "DATATYPE",
      header: ({ column }) => (
        <div className="w-[140px]" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span className="sort asc">
            <span className="sort-label">
              Data Type
            </span>
            <span className="sort-icon">
            </span>
          </span>
        </div>
      ),
      // @ts-ignore
      cell: ({ row }) => {
        const dataType = row.original.DATATYPE;
        return <span className="leading-none text-gray-700">{dataType}</span>
      }
    },
    {
      accessorKey: "FIELDNAME",
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span className="sort asc">
            <span className="sort-label">
              Field Name
            </span>
            <span className="sort-icon">
            </span>
          </span>
        </div>),
      // @ts-ignore
      cell: ({ row }) => {
        const fieldName = row.original.FIELDNAME;
        return <span className="leading-none font-semibold text-sm text-gray-900">{fieldName}</span>
      }
    },
    {
      accessorKey: "FIELDTEMPLATE",
      header: () => <div><span>Field Template</span></div>,
      // @ts-ignore
      cell: ({ row }) => {
        const fieldTemplateValue = findLnagName(fieldTemplate, row.original.FIELDTEMPLATE);

        return <div className="leading-none font-semibold text-sm text-gray-900 w-[200px] whitespace-normal break-words">{fieldTemplateValue}</div>
      }
    },
    {
      accessorKey: "ALLOWNULL",
      header: () => <div className="w-[75px]">Allow Null</div>,
      // @ts-ignore
      cell: ({ row }) => {
        const allowNullValue = findRefName(yesNo, row.original.ALLOWNULL);

        return <div>
          <span className="badge badge-sm badge-outline badge-success">
            {allowNullValue}
          </span>
        </div>
      }
    },
    {
      accessorKey: "PRIMARYKEY",
      header: () => <div className="w-[80px]">Primary Key</div>,
      // @ts-ignore
      cell: ({ row }) => {
        const primaryKeyValue = findRefName(yesNo, row.original.PRIMARYKEY);
        return <div>
          <span className="badge badge-sm badge-outline badge-success">
            {primaryKeyValue}
          </span>
        </div>
      }
    },
    {
      accessorKey: "LABELNAME1",
      /** @todo need to change the labelname based on the selected language*/
      header: ({ column }) => (
        <div onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span className="sort">
            <span className="sort-label">
              Label Name
            </span>
            <span className="sort-icon">
            </span>
          </span>
        </div>
      ),
      // @ts-ignore
      cell: ({ row }) => {
        const labelName = row.original.LABELNAME1;
        return <span className="leading-none font-semibold text-sm text-gray-900">{labelName}</span>
      }
    },
    {
      accessorKey: "FIELDTYPE",
      header: () => <div className="w-[80px]">Field Type</div>,
      // @ts-ignore
      cell: ({ row }) => {
        const fieldType = row.original.FIELDTYPE;
        return <span className="leading-none font-semibold text-sm text-gray-900">{fieldType}</span>
      }
    },
    {
      accessorKey: "CONTROLTYPE",
      header: () => <div className="w-[80px]">Control Type</div>,
      // @ts-ignore
      cell: ({ row }) => {
        const controlTypeValue = findRefName(controlType, row.original.CONTROLTYPE);
        return <span className="leading-none font-semibold text-sm text-gray-900">{controlTypeValue}</span>
      }
    },
    {
      accessorKey: "SHOWINLIST",
      header: () => <div className="w-[75px]">Show in List</div>,
      // @ts-ignore
      cell: ({ row }) => {
        const showInListValue = findRefName(yesNo, row.original.SHOWINLIST);
        return <div className="leading-none font-semibold text-sm text-gray-900"><span className="badge badge-sm badge-outline badge-success">{showInListValue}</span></div>
      }
    },
    {
      accessorKey: "MENDATORY",
      header: "Mandatory",
      // @ts-ignore
      cell: ({ row }) => {
        const mandatoryValue = findRefName(yesNo, row.original.MENDATORY);
        return <div className="leading-none font-semibold text-sm text-gray-900">  <span className="badge badge-sm badge-outline badge-success">{mandatoryValue}</span></div>
      }
    },
    {
      accessorKey: "VALIDATION",
      header: "Validation",
      // @ts-ignore
      cell: ({ row }) => {
        const validationValue = findRefName(fieldValidation, row.original.VALIDATION);
        return <div className="leading-none font-semibold text-sm text-gray-900">{validationValue}</div>
      }
    }
  ]


  const table = useReactTable({
    data: selectedRows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };


  return (
    <div className="w-full m-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Column..."
          value={(table.getColumn("FIELDNAME")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("FIELDNAME")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-x-auto max-w-full">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>


        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>

  );
}

export { GenerateForm };

