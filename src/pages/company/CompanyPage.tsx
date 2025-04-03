import React, { useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Avatar, Button, Space, Table, Card, Row, Col } from 'antd';
import companyData from './dummyData.js';
import CompanyAddButton from '@/components/button/Button.tsx';
import { PlusOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

// Data Type Interface
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
];

const CompanyPage: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [viewType, setViewType] = useState<'list' | 'grid'>('list'); // State for toggling between list and grid view

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age'
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Company Title',
      dataIndex: 'name',
      key: 'name',
      filters: [],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {record?.avatarUrl ? (
            <img
              src={record.avatarUrl}
              alt={text}
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          ) : (
            <Avatar style={{ backgroundColor: '#f56a00' }}>{text?.charAt(0).toUpperCase()}</Avatar>
          )}
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Sales Owner',
      dataIndex: 'salesOwner',
      key: 'salesOwner',
      ellipsis: true,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {record?.salesOwner?.avatarUrl ? (
            <img
              src={record?.salesOwner?.avatarUrl}
              alt={text}
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          ) : (
            <Avatar style={{ backgroundColor: '#f56a00' }}>
              {record?.salesOwner?.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <span>{record?.salesOwner?.name}</span>
        </div>
      )
    },
    {
      title: 'Open deals amount',
      dataIndex: 'dealsAggregate',
      key: 'dealsAggregate',
      ellipsis: true,
      render: (text, record) => <span> ₹ {record?.dealsAggregate[0]?.sum?.value}</span>
    }
  ];

  // Function to render grid cards
  const renderGridView = () => {
    return (
      <Row gutter={[16, 16]}>
        {companyData?.company?.map((company) => (
          <Col key={company.key} xs={24} sm={12} md={8} lg={6}>
            <Card style={{ width: '100%', margin: '10px' }}>
              <Card.Meta title={company.name} description={company?.address} />

              <div>
                <strong>Sales Owner: </strong>
                {company?.salesOwner?.name}
              </div>
              <div>
                <strong>Deals: </strong> ₹ {company?.dealsAggregate[0]?.sum?.value}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  // Function to render table view
  const renderTableView = () => {
    return (
      <Table<DataType>
        columns={columns}
        dataSource={companyData?.company}
        onChange={handleChange}
        pagination={true}
        size="small"
      />
    );
  };

  return (
    <>
      <div className="container px-5">
        <div className="flex justify-between">
          <CompanyAddButton />
          <div className="flex gap-2">
            {/* Button for grid view */}
            <Button
              type="primary"
              size="small"
              icon={<UnorderedListOutlined />}
              onClick={() => setViewType('grid')}
            >
              Grid View
            </Button>
            {/* Button for table view */}
            <Button
              type="primary"
              size="small"
              icon={<TableOutlined />}
              onClick={() => setViewType('list')}
            >
              Table View
            </Button>
          </div>
        </div>

        {/* Render grid or table based on viewType */}
        <div>{viewType === 'grid' ? renderGridView() : renderTableView()}</div>
      </div>
    </>
  );
};

export default CompanyPage;
