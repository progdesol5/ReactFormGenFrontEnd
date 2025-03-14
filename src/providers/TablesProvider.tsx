import { FieldTemplateType, RefTableItemType, TableFieldsArray } from "@/types/tableTypes";
import { getAllTables, getControlType, getCrudActions, getFieldTemplate, getFieldValidation, getTableSchema, getYesNo } from "@/utils";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState, type PropsWithChildren } from "react";

interface TablesContextType {
  tables: string[] | null;
  setTables: React.Dispatch<React.SetStateAction<string[] | null>>;
  fetchTables: () => Promise<void>;
  tableSchema: TableFieldsArray | null;
  setTableSchema: React.Dispatch<React.SetStateAction<TableFieldsArray | null>>;
  fetchTableSchema: (selectedTable: string) => Promise<void>;
  controlType: RefTableItemType[] | null;
  setControlType: React.Dispatch<React.SetStateAction<RefTableItemType[] | null>>;
  yesNo: RefTableItemType[] | null;
  setYesNo: React.Dispatch<React.SetStateAction<RefTableItemType[] | null>>;
  fieldTemplate: FieldTemplateType[] | null;
  setFieldTemplate: React.Dispatch<React.SetStateAction<any[] | null>>;
  fetchControlType: () => Promise<void>;
  fetchYesNo: () => Promise<void>;
  fetchFieldTemplate: () => Promise<void>;
  fieldValidation: RefTableItemType[] | null;
  setFieldValidation: React.Dispatch<React.SetStateAction<any[] | null>>;
  fetchFieldValidation: () => Promise<void>;
  crudActions: RefTableItemType[] | null;
  setCrudActions: React.Dispatch<React.SetStateAction<any[] | null>>;
  editor: any;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
  editorRef: React.MutableRefObject<any>;
}


const TablesContext = createContext<TablesContextType>({} as TablesContextType);


const useTables = () => useContext(TablesContext)

const TablesProvider = ({ children }: PropsWithChildren) => {
  const [tables, setTables] = useState<string[] | null>([])
  const [tableSchema, setTableSchema] = useState<TableFieldsArray | null>([]);
  const [controlType, setControlType] = useState<RefTableItemType[] | null>([]);
  const [yesNo, setYesNo] = useState<RefTableItemType[] | null>([]);
  const [fieldTemplate, setFieldTemplate] = useState<FieldTemplateType[] | null>([]);
  const [fieldValidation, setFieldValidation] = useState<RefTableItemType[] | null>([]);
  const [crudActions, setCrudActions] = useState<RefTableItemType[] | null>([]);
  const [editor, setEditor] = useState<any>(null);
  const editorRef = useRef<any>(null);

  const fetchTables = async () => {
    try {
      const data = await getAllTables();
      setTables(data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchTableSchema = useCallback(async (tableName: string) => {
    try {
      const data = await getTableSchema(tableName);
      setTableSchema(data);
    } catch (error) {
      console.error("Error fetching table schema:", error);
    }
  }, []);

  const fetchControlType = useCallback(async () => {
    try {
      const data = await getControlType();
      setControlType(data);
    } catch (error) {
      console.error("Error fetching control type:", error);
    }
  }, []);

  const fetchYesNo = useCallback(async () => {
    try {
      const data = await getYesNo();
      setYesNo(data);
    } catch (error) {
      console.error("Error fetching yes no:", error);
    }
  }, []);

  const fetchFieldTemplate = useCallback(async () => {
    try {
      const data = await getFieldTemplate();
      setFieldTemplate(data);
    } catch (error) {
      console.error("Error fetching field template:", error);
    }
  }, []);

  const fetchFieldValidation = useCallback(async () => {
    try {
      const data = await getFieldValidation();
      setFieldValidation(data);
    } catch (error) {
      console.error("Error fetching field validation:", error);
    }
  }, [])

  const fetchCrudActions = useCallback(async () => {
    try {
      const data: any = await getCrudActions();
      setCrudActions(data);
    } catch (error) {
      console.error("Error fetching CRUD actions:", error);
    }

  }, [])

  useEffect(() => {
    fetchControlType();
    fetchYesNo();
    fetchFieldTemplate();
    fetchFieldValidation();
    fetchCrudActions()

  }, [fetchControlType, fetchYesNo, fetchFieldTemplate, fetchFieldValidation, fetchCrudActions])

  return (
    <TablesContext.Provider value={{ tables, setTables, fetchTables, tableSchema, setTableSchema, fetchTableSchema, controlType, setControlType, yesNo, setYesNo, fieldTemplate, setFieldTemplate, fetchControlType, fetchYesNo, fetchFieldTemplate, fetchFieldValidation, fieldValidation, setFieldValidation, crudActions, setCrudActions, editor, setEditor, editorRef }}>
      {children}
    </TablesContext.Provider>)
}

// eslint-disable-next-line react-refresh/only-export-components
export { TablesProvider, useTables };

