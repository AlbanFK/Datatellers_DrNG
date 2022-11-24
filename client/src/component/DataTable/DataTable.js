import React, { useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';

import dayjs from 'dayjs'

function DataTable({data}) {
  dayjs().format()
  const navigate = useNavigate()
    const ageRange = [
      {
        text: '1',
        
      }
    ]
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('name'),
          sorter: {
            compare: (a, b) => a.name.length - b.name.length,
            multiple: 5,
          },
        },
        {
          title: 'Code',
          dataIndex: 'unique_code',
          key: 'code',
          
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          ...getColumnSearchProps('age'),
          sorter: {
            compare: (a, b) => a.age - b.age,
            multiple: 6,
          },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          ...getColumnSearchProps('address'),
          sorter: {
            compare: (a, b) => a.address.length - b.address.length,
            multiple: 7,
          },
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'Sex',
          dataIndex: 'sex',
          key: 'sex',
          sorter: {
            compare: (a, b) => a.sex.length  - b.sex.length ,
            multiple: 4,
          },
          filters: [
            {
              text: 'male',
              value: 'male',
            },
            {
              text: 'female',
              value: 'female',
            },
            
          ],
          onFilter: (value, record) => record.sex.indexOf(value) === 0,
          
        },
        {
          title: 'Request date',
          dataIndex: 'request_date',
          key: 'request_date',
          sorter: {
            compare: (a, b) => {
              const dateone = new Date(a.request_date)
              const datetwo = new Date(b.request_date)
              return dateone.getTime() - datetwo.getTime() 
             
            },
            multiple: 3,
          },
          render: (_, { request_date }) => (
             dayjs(request_date).format('DD/MM/YYYY')
          ),
        },
        {
          title: 'Appointment date',
          dataIndex: 'appointment_date',
          key: 'appointment_date',
          sorter: {
            compare: (a, b) => {
              const dateone = new Date(a.appointment_date)
              const datetwo = new Date(b.appointment_date)
              return dateone.getTime() - datetwo.getTime() 
             
            },
            multiple: 3,
          },
          render: (_, { appointment_date }) => (
            dayjs(appointment_date).format('DD/MM/YYYY')
         ),
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          sorter: {
            compare: (a, b) => a.status.charCodeAt(0) - b.status.charCodeAt(0),
            multiple: 1,
          },
          filters: [
            {
              text: 'missed',
              value: 'missed',
            },
            {
              text: 'recheduled',
              value: 'recheduled',
            },
            {
              text: 'Passed',
              value: 'Passed',
            },
            {
              text: 'pending',
              value: 'pending',
            },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          render: (_, { status }) => (
            <Tag color={(status === 'missed') ? 'volcano' : (status === 'Passed') ? 'success' : 
            (status === 'recheduled') ? 'warning' : (status === 'pending') && 'processing'}>
            {status}
            </Tag> 
          ),
        },
        
      ];
      
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      size='small' 
      scroll={{y: 240, x: 1170,}} 
      pagination={{
        position: ['bottomCenter'],
      }} 
      onRow={(record, rowIndex) => {
      return {
        onClick: event => {
          console.log(record);
          navigate('/' + record.unique_code)
        }, 
      };
    }}
    onChange={onChange}
    
    />
  )
}

export default DataTable
