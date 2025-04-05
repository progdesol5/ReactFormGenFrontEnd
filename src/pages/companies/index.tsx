import React, { useState } from 'react';

import { Table, Space, Input, Typography } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { CustomAvatar, Text } from '@/components';

export default function CompanyListPage() {
  const staticTableSource = [
    {
      id: '32',
      name: 'this is the Krunal Mali',
      avatarUrl: null,
      dealsAggregate: [
        {
          sum: {
            value: null
          }
        }
      ]
    },
    {
      id: '11',
      name: 'Terry, Kshlerin and Witting',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/11.png',
      dealsAggregate: [
        {
          sum: {
            value: 419194
          }
        }
      ]
    },
    {
      id: '23',
      name: 'Treutel - Reilly',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/22.png',
      dealsAggregate: [
        {
          sum: {
            value: 474342
          }
        }
      ]
    },
    {
      id: '17',
      name: 'Kertzmann, Murazik and Wiegand',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/16.png',
      dealsAggregate: [
        {
          sum: {
            value: 563705
          }
        }
      ]
    },
    {
      id: '2',
      name: 'Ruecker, Prosacco and Brown',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/2.png',
      dealsAggregate: [
        {
          sum: {
            value: 729300
          }
        }
      ]
    },
    {
      id: '6',
      name: 'Schowalter - Schroeder',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/6.png',
      dealsAggregate: [
        {
          sum: {
            value: 169528
          }
        }
      ]
    },
    {
      id: '7',
      name: 'Anderson, Walker and Simonis',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/7.png',
      dealsAggregate: [
        {
          sum: {
            value: 316940
          }
        }
      ]
    },
    {
      id: '31',
      name: 'Runolfsdottir, Gibson and Thompson',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/30.png',
      dealsAggregate: [
        {
          sum: {
            value: 649236
          }
        }
      ]
    },
    {
      id: '9',
      name: "O'Keefe Inc",
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/9.png',
      dealsAggregate: [
        {
          sum: {
            value: 215128
          }
        }
      ]
    },
    {
      id: '8',
      name: 'Wisozk Inc',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/8.png',
      dealsAggregate: [
        {
          sum: {
            value: 615007
          }
        }
      ]
    },
    {
      id: '25',
      name: 'Hyatt, Smith and Olson',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/24.png',
      dealsAggregate: [
        {
          sum: {
            value: 308335
          }
        }
      ]
    },
    {
      id: '13',
      name: 'Ullrich Inc',
      avatarUrl: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/12.png',
      dealsAggregate: [
        {
          sum: {
            value: 434797
          }
        }
      ]
    }
  ];

  const [data, setData] = useState(staticTableSource || []);

  return (
    <div className="page-container">
      <Table
        dataSource={data}
        pagination={{
          pageSizeOptions: ['12', '24', '48', '96'],
          showTotal: (total) => `Total ${total} companies`
        }}
        rowKey="id"
      >
        <Table.Column
          dataIndex="name"
          title="Company Title"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <div style={{ padding: 8 }}>
              <Input placeholder="Search Company" />
            </div>
          )}
          render={(_, record) => {
            return (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Text
                  style={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {record.name}
                </Text>
              </Space>
            );
          }}
        />
        <Table.Column
          dataIndex="totalRevenue"
          title="Open Deals Amount"
          render={(_, record) => <Text>${record.dealsAggregate[0].sum.value}</Text>}
        />
        <Table.Column
          fixed="right"
          title="Actions"
          render={(record) => (
            <Space>
              <button>Edit</button>
              <button>Delete</button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
