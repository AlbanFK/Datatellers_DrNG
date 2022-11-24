import React, {useState, useEffect} from 'react'
import { Form, Button, Input, Select, DatePicker,TimePicker,Spin  } from 'antd';

import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux'
import { createAppointment,findOne, updateOne } from '../../redux/appointment/newAppmentSlice'
import { allAppointments } from '../../redux/appointment/appointmentrSlice'


import dayjs from 'dayjs'


import './style.css'


function AppmentForm() {
  dayjs().format()

    const {code} = useParams()
    let newData = useSelector(state => state.newAppointment.data)
    const loading = useSelector(state => state.newAppointment.status)
    const allData = useSelector(state => state.appointment.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    

    const onFinish = (values) => {
      if (code) {
        console.log('Received values from form: ', values);
        dispatch(updateOne({code, values}))
        navigate('/',{state: {change: true }})
      } else {
        // console.log('Received values from form: ', values.appointment_date);
        const date = dayjs(values.request_date).format('YYYY-MM-DD')
        const d = new Date(date);
        const sn = allData.length + 1
        const yy = d.getFullYear() - 2000
        const mm = d.getMonth() + 1
        const dd = d.getDate()
        console.log(d, dd, allData.length, "A" + sn + dd + mm + yy);
        values.unique_code = "A" + sn + dd + mm + yy
        console.log('Received values from form: ', values);

        dispatch(createAppointment(values))
        // const resp = useSelector(state => state.newAppointment.data)
        console.log('new',newData);
       
        navigate('/',{state: {change: true }})
            
     
        
        // if (data.status === 200) {
        //   navigate('/')
        // }
      }
     
    };

    const { TextArea } = Input

    const fetchingOne = () => {
      dispatch(findOne(code))
    }

    useEffect(() => {
      dispatch(allAppointments())
      if (code ) {
        fetchingOne()
          // console.log('find', newData);
      }
      console.log('find', newData);
     
  }, [])
  
  return (
    <div style={{width: '100%',}}>

      <Spin spinning={(loading === 'loading') ? true : false} size="large">

        <div className='header'>
            <div className='entete'>
                <p className='appointmentTitle'>
                    <ArrowLeftOutlined  style={{fontSize: '20px', marginRight: '20px', cursor: 'pointer'}} 
                    onClick={() => { navigate('/')}} />
                    {code ? code : 'NEW REPORT'}
                    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "3px"}}>
                        <div style={{width: "50%", height: "2px", backgroundColor: "#c06174" }}></div>
                    </div>
                </p>    
            </div>
        </div>
        { (loading === 'loading') ?
          ''
        :
        <div className='formContainer'>
          <Form  layout='vertical' onFinish={onFinish} initialValues={code && newData} >
              <div >
                <p style={{fontSize: '14px', fontWeight: '700'}}>General Information</p>

                <div style={{display: 'flex', gap: '8px'}}>
                  <Form.Item
                  name="unique_code"
                  label="Unique code"
                  colon={false}
                  
                  >
                    <Input  style={{borderRadius: '7px', width: '120px'}} disabled = {true} />
                  </Form.Item>

                  <Form.Item
                  name="name"
                  label="Name"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Input style={{borderRadius: '7px'}}/>
                  </Form.Item>

                  <Form.Item
                  name="sex"
                  label="Sex"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Select
                    style={{
                      borderRadius: '7px',
                      width: '120px'
                    }}
                    
                      options={[
                        {
                          value: 'male',
                          label: 'male',
                        },
                        {
                          value: 'female',
                          label: 'female',
                        },
                        
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                  name="phone"
                  label="Phone"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Input style={{borderRadius: '7px'}}/>
                  </Form.Item>

                  <Form.Item
                  name="email"
                  label="Email"
                  colon={false}
                  >
                    <Input style={{borderRadius: '7px', }}/>
                  </Form.Item>

                  <Form.Item
                  name="age"
                  label="Age"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Input style={{borderRadius: '7px', width: '50px'}}/>
                  </Form.Item>
                </div>
                
                <hr/>

                <p style={{fontSize: '14px', fontWeight: '700', marginTop: '30px'}}>Appointment Information</p>

                <div style={{display: 'flex', gap: '12px'}}>
                  <Form.Item
                  name="appointment_date"
                  label="Appointment date"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <DatePicker format={'DD/MM/YYYY'} style={{borderRadius: '7px'}} onChange={ value => console.log(value) }/>
                    
                  </Form.Item>

                  <Form.Item
                  name="first_time"
                  label="First time"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Select
                    style={{
                      borderRadius: '7px',
                      width: '120px'
                    }}
                    
                      options={[
                        {
                          value: 'No',
                          label: 'No',
                        },
                        {
                          value: 'Yes',
                          label: 'Yes',
                        },
                        
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                  name="request_date"
                  label="Request date"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <DatePicker format={'DD/MM/YYYY'} style={{borderRadius: '7px'}} onChange={ value => console.log(value) }/>
                    
                  </Form.Item>

                  <Form.Item
                  name="status"
                  label="Appointment Status"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Select
                    style={{
                      borderRadius: '7px',
                      width: '120px'
                    }}
                    
                      options={[
                        {
                          value: 'pending',
                          label: 'Pending',
                        },
                        {
                          value: 'Passed',
                          label: 'Passed',
                        },
                        {
                          value: 'missed',
                          label: 'Missed',
                        },
                        {
                          value: 'recheduled',
                          label: 'Recheduled',
                        },
                        
                      ]}
                    />
                  </Form.Item>
                  
                  <Form.Item
                  name="appointment_time"
                  label="Appointment time"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <TimePicker  style={{borderRadius: '7px'}}  onChange={ value => console.log(value) }/>
                    
                  </Form.Item>

                  
                </div>

                <p style={{fontSize: '14px', fontWeight: '700', marginTop: '20px'}}>Address Information</p>

                <div style={{display: 'flex', gap: '20px'}}>
                  
                  <Form.Item
                  name="address"
                  label="Address 1"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <Input style={{borderRadius: '7px'}}/>
                  </Form.Item>

                  <Form.Item
                  name="city"
                  label="City"
                  colon={false}
                  >
                    <Input style={{borderRadius: '7px'}}/>
                  </Form.Item>
    
                </div>
                <p style={{fontSize: '14px', fontWeight: '700', marginTop: '20px'}}>Notes </p>

                <div style={{display: 'flex', gap: '30px'}}>
                  
                  <Form.Item
                  name="comment_before"
                  label="Before Appointment"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                  >
                    <TextArea style={{borderRadius: '7px', width: '300px'}} autoSize={ {minRows: 3, maxRows: 6 }}/>
                  </Form.Item>

                  <Form.Item
                  name="comment_after"
                  label="After Appointment"
                  colon={false}
                  >
                    <TextArea autoSize={ {minRows: 3, maxRows: 6 }} style={{borderRadius: '7px', width: '300px'}}/>
                    {/* <Input style={{borderRadius: '7px'}}/> */}
                  </Form.Item>
    
                </div>

                
              </div>

              
                <Form.Item style={{display: 'flex ', justifyContent: 'end', paddingRight: '20%'}}> 
                  <Button htmlType="submit" style={{
                    backgroundColor: 'rgb(189, 100, 112)', color: 'white',
                    borderRadius: '5px',
                    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                    
                    }}>
                    Save
                  </Button> 
                </Form.Item>
              

              
          </Form>
        </div>
        }
      </Spin>
      
    </div>
  )
}

export default AppmentForm
