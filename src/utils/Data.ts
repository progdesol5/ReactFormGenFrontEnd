const deepMerge = (obj1: any, obj2: any): any => {
  const output = Object.assign({}, obj1);

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null && obj1[key]) {
        output[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        output[key] = obj2[key];
      }
    }
  }

  return output;
};

const generateUniqueToken = (): string => {
  const timestamp: number = new Date().getTime();
  const randomString: string = Math.random().toString(36).substring(2, 8); // Random string of length 6

  return `${timestamp}-${randomString}`;
};

const fieldTypeOptions = [
  { label: 'Text Input', value: 'text' },
  { label: 'Number Input', value: 'number' },
  { label: 'Date Picker', value: 'date' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Dropdown', value: 'select' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Radio Button', value: 'radio' },
  { label: 'Password', value: 'password' },
  { label: 'File Upload', value: 'file' }
];
const dataTypeOptions = [
  // Numeric types
  { label: 'Integer', value: 'INT' },
  { label: 'Big Integer', value: 'BIGINT' },
  { label: 'Decimal', value: 'DECIMAL' },
  { label: 'Float', value: 'FLOAT' },
  { label: 'Double', value: 'DOUBLE' },
  { label: 'Tiny Integer', value: 'TINYINT' },

  // String types
  { label: 'Varchar', value: 'VARCHAR' },
  { label: 'Text', value: 'TEXT' },
  { label: 'Char', value: 'CHAR' },
  { label: 'Tiny Text', value: 'TINYTEXT' },
  { label: 'Medium Text', value: 'MEDIUMTEXT' },
  { label: 'Long Text', value: 'LONGTEXT' },

  // Date and time types
  { label: 'Date', value: 'DATE' },
  { label: 'Datetime', value: 'DATETIME' },
  { label: 'Timestamp', value: 'TIMESTAMP' },
  { label: 'Time', value: 'TIME' },
  { label: 'Year', value: 'YEAR' },

  // Boolean type
  { label: 'Boolean', value: 'BOOLEAN' },

  // JSON type
  { label: 'JSON', value: 'JSON' }
];
const binaryOptions = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' }
];

const yesNoOptions = [
  { label: 'YES', value: 'YES' },
  { label: 'NO', value: 'NO' }
];

const tableFieldKeys = [
  { key: 'ID', type: 'number' },
  { key: 'Form Template', type: 'number' },
  { key: 'Table Schema', type: 'text' },
  { key: 'API Name', type: 'text' },
  { key: 'Form Title', type: 'text' },
  { key: 'Table Name', type: 'text' },
  { key: 'Field Name', type: 'text' },
  { key: 'Primary Key', type: 'select', options: binaryOptions },
  { key: 'Field Type', type: 'select', options: fieldTypeOptions },
  { key: 'Max Field Type', type: 'text' },
  { key: 'Field Template', type: 'number' },
  { key: 'Data Type', type: 'select', options: dataTypeOptions },
  { key: 'Primary', type: 'select', options: binaryOptions },
  { key: 'Allow Null', type: 'select', options: yesNoOptions },
  { key: 'Label Name 1', type: 'text' },
  { key: 'Label Name 2', type: 'text' },
  { key: 'Label Name 3', type: 'text' },
  { key: 'Control Type', type: 'number' },
  { key: 'Show in List', type: 'select', options: binaryOptions },
  { key: 'Mandatory', type: 'select', options: binaryOptions },
  { key: 'Search Allow', type: 'select', options: binaryOptions },
  { key: 'Sort Number', type: 'number' },
  { key: 'Validation', type: 'number' },
  { key: 'Switch 1', type: 'text' },
  { key: 'Switch 2', type: 'text' },
  { key: 'Switch 3', type: 'text' },
  { key: 'Switch 4', type: 'date' },
  { key: 'Switch 5', type: 'number' },
  { key: 'Switch 6', type: 'number' }
];

// for controltype, yes no fields & crud
const fieldGeneratorType = [
  {
    GENERATORNAME: 'CONTROLTYPE',
    TENANTID: 1,
    SOURCE: 1,
    LANGUAGE: 'EN',
    MODULE: 'FORM',
    REFTYPE: 'GENERTAOR',
    REFSUBTYPE: 'CONTROLTYPE'
  },
  {
    GENERATORNAME: 'YESNO',
    TENANTID: 1,
    SOURCE: 1,
    LANGUAGE: 'EN',
    MODULE: 'ALL',
    REFTYPE: 'YESNO',
    REFSUBTYPE: 'YESNO'
  },
  {
    GENERATORNAME: 'CRUD',
    TENANTID: 1,
    SOURCE: 1,
    LANGUAGE: 'EN',
    MODULE: 'ALL',
    REFTYPE: 'CRUDALLOW',
    REFSUBTYPE: 'CRUD'
  },
  {
    GENERATORNAME: 'VALIDATION',
    TENANTID: 1,
    SOURCE: 1,
    LANGUAGE: 'EN',
    MODULE: 'FORM',
    REFTYPE: 'VALIDATION',
    REFSUBTYPE: 'FIELDVALIDATION'
  },
  {
    GENERATORNAME: 'FIELDTEMPLATE',
    TENANTID: 1,
    MODULE: 'FORM',
    REFTYPE: 'FIELDTEMPLATE'
  }
  // {
  //   GENERATORNAME: 'VALIDATION',
  //   TENANTID: 1,
  //   MODULE: 'FORM',
  //   REFTYPE: 'VALIDATION'
  // }
];

const CreateRefDefaultValue = {
  MYREFID: 0,
  TENANTID: 1,
  REFID: 0,
  MODULE: 'string',
  REFTYPE: 'string',
  REFSUBTYPE: 'string',
  MYEXT: 0,
  SHORTNAME: 'string',
  REFNAME1: 'string',
  REFNAME2: 'string',
  REFNAME3: 'string',
  SWITCH1: 'string',
  SWITCH2: 'string',
  SWITCH3: 'string',
  SWITCH4: 0,
  SORTBY: 0,
  MEVISIBLE: 0,
  REMARKS: 'string',
  ACTIVE: 'string',
  INFRASTRUCTURE: 'string',
  REFIMAGE: 'string',
  UPLOADDATE: '2024-12-15T08:14:47.301Z',
  UPLOADBY: 'string',
  SYNCDATE: '2024-12-15T08:14:47.301Z',
  SYNCBY: 'string',
  SYNID: 0,
  CRUPID: 0,
  LANG1: 'string',
  LANG2: 'string',
  LANG3: 'string'
};

export {
  binaryOptions,
  CreateRefDefaultValue,
  dataTypeOptions,
  deepMerge,
  fieldGeneratorType,
  fieldTypeOptions,
  generateUniqueToken,
  tableFieldKeys,
  yesNoOptions
};
