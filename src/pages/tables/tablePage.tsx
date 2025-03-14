import { useTables } from "@/providers";
import { TableField } from "@/types/tableTypes";
import { findLnagName, findRefName, updateTableSchema } from "@/utils/scripts";
import { CircularProgress } from "@mui/material";
import { ColumnDef, ColumnFiltersState, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Check, ChevronsUpDown, Pencil, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { EditModal } from "./modals/editModal";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
// import { debounce } from "@/lib/helpers";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TablePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  let tableId = useRef<string | null>(searchParams.get("tableName"));
  let demo = useRef<string | null>(searchParams.get("demo"));
  const [selectedTable, setSelectedTable] = useState<string | null>(tableId.current);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState<TableField[]>([]);
  const [open, setOpen] = useState(false);
  const query = useQuery();
  const currentDemo = query.get("demo") || "demo1";
  const navigate = useNavigate();
  const { tableSchema, setTableSchema, fetchTableSchema, controlType, yesNo, fieldTemplate, fieldValidation, tables, fetchTables } = useTables();

  // useEffect(() => {
  //   translateToArabic("hello").then(console.log);
  // }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    fetchTables();

    if (currentDemo && !demo.current) {
      params.set('demo', currentDemo);
    }

    if (!tableId.current && tables && tables.length > 0) {
      params.set('tableName', tables[0]);
      navigate(`?${params.toString()}`, { replace: true });
      window.location.reload();
    }
  }, [fetchTables, tables, currentDemo, navigate]);


  const column: ColumnDef<TableField>[] = [
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
      accessorKey: "ACTIONS",
      header: "Actions",
      cell: ({ row }) => {

        return (
          <div className="flex gap-4" >
            <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleEditClick(row.original)} disabled={!row.getIsSelected()}>
              <Pencil className="w-[13px] h-[13px]" />
            </button>
            <button className="btn btn-sm btn-outline btn-danger" disabled={!row.getIsSelected()}>
              <Trash2Icon className="w-[13px] h-[13px]" />
            </button>
          </div>
        )
      }
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

  // @ts-ignore
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // @ts-ignore
  const handleSave = async (updatedData) => {
    const res = await updateTableSchema(updatedData);

    if (res?.status === 200) {
      toast.success(res.data);
      setIsModalOpen(false);

      setTableSchema((prev) =>
        prev?.map((row) =>
          row.ID === updatedData.ID ? { ...row, ...updatedData } : row
        ) || []
      );

    } else {
      toast.error(res?.title);
    }
  };

  const customGlobalFilter: FilterFn<any> = useMemo(() => {
    return (row, _columnIds, filterValue) => {
      const fieldsToSearch = ["FIELDNAME", "DATATYPE", "LABELNAME1"];
      return fieldsToSearch.some((field) =>
        String(row.getValue(field)).toLowerCase().includes(filterValue.toLowerCase())
      );
    };
  }, []);

  // const debouncedSetGlobalFilter = useMemo(
  //   () => debounce((value: string) => setGlobalFilter(value), 300),
  //   [setGlobalFilter]
  // );

  // const handleSearchInputChange = (value: string) => {
  //   debouncedSetGlobalFilter(value);
  // };

  const table = useReactTable({
    data: tableSchema || [],
    columns: column,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    // onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: customGlobalFilter,
    onRowSelectionChange: (updaterOrValue) => {
      const resolvedSelection =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue;

      setRowSelection(resolvedSelection);
      const selectedData = Object.keys(resolvedSelection)
        .filter((rowId) => resolvedSelection[rowId])
        .map((rowId) => {
          const row = table.getRow(rowId);
          return row?.original;
        });

      setSelectedRows(selectedData);
    },
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
      pagination
    },
  });
  const handleTableSelect = (selectedTableId: string) => {
    setSearchParams({ tableName: selectedTableId });
  };

  useEffect(() => {
    const loadTables = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selectedTable) {
          await fetchTableSchema(selectedTable);
        }
      } catch (error) {
        setError("Failed to load tables.");
      }
      finally {
        setLoading(false);
      }
    };
    loadTables();
  }, [fetchTableSchema, selectedTable])



  const navigateToGeneratedPage = () => {
    navigate("/generated-table", { state: { rows: selectedRows } });
  };




  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="my-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">Table Name: {selectedTable}</h1>
      </div>

      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <div className="flex gap-4 items-center justify-between">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between custom-input-color"
                  >
                    {selectedTable
                      ? tables?.find((table) => table === selectedTable)
                      : "Select a Table..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Table..." className="h-9" />
                    {/* <CommandInput placeholder="Search Table..." className="h-9" value={globalFilter || ""}
                      onValueChange={handleSearchInputChange} /> */}
                    <CommandList>
                      <CommandEmpty>No Table found.</CommandEmpty>
                      <CommandGroup>
                        {tables?.sort().map((table) => (
                          <CommandItem
                            key={table}
                            value={table}
                            onSelect={(currentValue) => {
                              // setValue(currentValue === selectedTable ? "" : currentValue)
                              setOpen(false)
                              setSelectedTable(currentValue === selectedTable ? "" : currentValue);
                              handleTableSelect(currentValue)
                            }}
                          >
                            {table}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedTable === table ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <button className="btn btn-light" disabled={selectedRows.length !== 5}
                onClick={() => navigateToGeneratedPage()}>Generate</button>
            </div>

            <div className="flex gap-6 justify-end">
              <div className="relative">
                <i className="ki-outline ki-magnifier leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3">
                </i>
                <input
                  placeholder="Search Data"
                  className="input input-sm pl-8"
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div data-datatable="true" data-datatable-page-size="5">
              <div className="scrollable-x-auto">
                <table className="relative table table-auto table-border" data-datatable-table="true" id="grid_table">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  {loading ? <div className="h-16 relative flex items-center justify-center"><CircularProgress /></div> : error ? <div>{error}</div> : (
                    <>
                      <tbody>
                        {table.getRowModel().rows?.length ? (
                          tableSchema && (
                            table.getRowModel()?.rows.map((row) => (
                              <tr
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id}>
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={column.length}
                              className="h-24 text-center"
                            >
                              No results.
                            </TableCell>
                          </TableRow>
                        )}

                      </tbody>
                    </>
                  )}
                </table>
              </div>
              <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
                <div className="flex items-center gap-4">
                  <span>Show</span>
                  <select
                    className="select select-sm"
                    value={table.getState().pagination.pageSize}
                    onChange={(event) => table.setPageSize(Number(event.target.value))}
                  >
                    {[7, 10, 20, 30, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <div>per page</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-x-2 pagination">
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="flex items-center gap-2">
                      Showing {(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length}
                    </div>
                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        selectedRow && <EditModal
          isOpen={isModalOpen}
          closeModal={handleModalClose}
          rowData={selectedRow}
          onSubmit={handleSave}
        />
      }

    </div>
  )
}

export { TablePage };

