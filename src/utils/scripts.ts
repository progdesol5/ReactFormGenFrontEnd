import { FieldTemplateType, RefTableItemType } from '@/types/tableTypes';
import axios from 'axios';
// Path to the JSON key file of your Service Account
const serverUrl = import.meta.env.VITE_APP_BACKEND_URL;
const translateAPIKey = import.meta.env.VITE_APP_GOOGLE_ARABIC_TRANSLATE_API;
const keyFilename = '/src/lib/google-translator-api-json.json';

let cachedTables: string[] | null = null;

export const getAllTables = async () => {
  // Check if data is already cached
  if (cachedTables) {
    return cachedTables;
  }

  try {
    const response = await axios.get(`${serverUrl}/api/Select/tables`);
    cachedTables = response.data;
    return cachedTables;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return null;
  }
};

export const getTableSchema = async (tableName: string | undefined) => {
  try {
    const res = await axios.get(`${serverUrl}/api/Schemas/GetTableSchema?TableName=${tableName}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const tableSchemaInsert = async (formData: { [key: string]: string | null }) => {
  try {
    const json = JSON.stringify([formData]);
    console.log(json);
    const response = await axios.post(`${serverUrl}/api/Schemas/TableSchemaInsert`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error: any) {
    console.log(error.response.data.title);
    return null;
  }
};

// @ts-ignore
export const updateTableSchema = async (updatedrowData) => {
  try {
    const json = JSON.stringify([updatedrowData]);

    const res = await axios.post(`${serverUrl}/api/Schemas/TableSchemaUpdate`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res;
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

export const getControlType = async (
  tenantId = 1,
  source = 1,
  language = 'EN',
  module = 'FORM',
  refType = 'GENERTAOR',
  refSubtype = 'CONTROLTYPE'
) => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/RefTable/GetRefTable?tenantId=${tenantId}&source=${source}&language=${language}&module=${module}&refType=${refType}&refSubtype=${refSubtype}`,
      {
        pageNumber: 1,
        pageSize: 100,
        query: 'string'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getYesNo = async (
  tenantId = 1,
  source = 1,
  language = 'EN',
  module = 'ALL',
  refType = 'YESNO',
  refSubtype = 'YESNO'
) => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/RefTable/GetRefTable?tenantId=${tenantId}&source=${source}&language=${language}&module=${module}&refType=${refType}&refSubtype=${refSubtype}`,
      {
        pageNumber: 1,
        pageSize: 100,
        query: 'string'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFieldValidation = async (
  tenantId = 1,
  source = 1,
  language = 'EN',
  module = 'FORM',
  refType = 'VALIDATION',
  refSubtype = 'FIELDVALIDATION'
) => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/RefTable/GetRefTable?tenantId=${tenantId}&source=${source}&language=${language}&module=${module}&refType=${refType}&refSubtype=${refSubtype}`,
      {
        pageNumber: 1,
        pageSize: 100,
        query: 'string'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFieldTemplate = async (
  tenantId = 1,
  module = 'FORM',
  refType = 'FIELDTEMPLATE'
) => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/RefTable/GetRefSubType?tenantId=${tenantId}&module=${module}&refType=${refType}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCrudActions = async (Module = 'ALL', Reftype = 'CRUDALLOW', TenantId = 1) => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/RefTable/GetRefSubType?Module=${Module}&Reftype=${Reftype}&TenantId=${TenantId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const translateToArabic = async (text: any) => {
  const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${translateAPIKey}`;

  try {
    const response = await axios.post(endpoint, {
      q: text, // Text to translate
      target: 'ar', // Target language code: Arabic
      source: 'en' // Source language code: English
    });

    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Translation API error:', error);
    return 'Translation failed';
  }
};

export function generateRandom4Digit() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const createRefTableFunc = async (refTableData: any) => {
  try {
    const json = JSON.stringify([refTableData]);
    const res = await axios.post(`${serverUrl}/api/RefTable/ReftableInsert`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return res;
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

export const findRefName = (list: RefTableItemType[] | null, id: string | number) =>
  list?.find((item) => item?.MYREFID.toString() === id)?.REFNAME1 || id;
export const findLnagName = (list: FieldTemplateType[] | null, id: string | number) =>
  list?.find((item) => item?.MYREFID.toString() === id)?.LANG1 || id;

// it's for server side translation
// const translate = new Translate({ keyFilename });

// export const translateToArabic3 = async (text: string): Promise<string> => {
//   try {
//     const target = 'ar'; // Target language: Arabic

//     // Perform translation
//     const [translation] = await translate.translate(text, target);
//     console.log(`Translation: ${translation}`);
//     return translation;
//   } catch (error) {
//     console.error('Error during translation:', error);
//     return text; // Return the original text in case of failure
//   }
// };
