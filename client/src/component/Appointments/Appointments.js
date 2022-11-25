import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation } from "react-router-dom"

import { Input, Row, Spin, Button  } from 'antd';
import { SearchOutlined, PlusOutlined  } from '@ant-design/icons';
import Card from '../StatusCard/Card';
import DataTable from '../DataTable/DataTable';

import { useSelector, useDispatch } from 'react-redux'
import { allAppointments,recap } from '../../redux/appointment/appointmentrSlice'



import './style.css'


function Appointments() {
    const location = useLocation();
    const navigate = useNavigate()
    const fetchingStatus = useSelector(state => state.appointment.status)
    const data = useSelector(state => state.appointment.data)
    const recapData = useSelector(state => state.appointment.recap)
    // console.log(recapData);
    const dispatch = useDispatch()
    const fetchingAllAppointments = () => {
        dispatch(allAppointments())
    }

    useEffect(() => {
        
        
        if ((data.length === 0) || location.state) {
            fetchingAllAppointments();
        }
       
    }, [])

    useEffect(() => {
       dispatch(recap())
    //    console.log(data);
    }, [dispatch, data])
    

    const suffix = (
        <SearchOutlined 
        style={{
            fontSize: 16,
            color: '#c06174',
            cursor: 'pointer'
          }}
        />
    )
    
  return (
    <div className=''>
        <div className='header'>
            <div className='entete'>
                <p className='appointmentTitle'>
                    Appointments
                    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "3px"}}>
                        <div style={{width: "50%", height: "2px", backgroundColor: "#c06174" }}></div>
                    </div>
                </p>
                {/* <div className='searchDiv'>
                    <Input  placeholder="search" bordered={false}  suffix={suffix} />
                </div> */}
            </div>

            {(fetchingStatus === 'idle') &&
                <Row gutter={50}>
                    {recapData.map(total => (
                        <Card type={total.type} number={total.number}/>
                    ))}
                    
                </Row>
            }
            
        </div>
        <div className='dataRender'>
            {(fetchingStatus === 'idle') ? 
                <DataTable data={data}/>   
            :
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
                    <Spin tip="Loading..." size="large"></Spin>
                </div>
                 
            }
            <Button onClick={() => navigate('/newAppointment')} style={{
                backgroundColor: 'rgb(189, 100, 112)', color: 'white',
                borderRadius: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                border: '0px',
                position: 'absolute',
                bottom: '10px',
                right: '10%'
                }}>
                <PlusOutlined 
                style={{
                    fontSize: 16,
                    color: 'white',
                    
                }}
                />
            </Button> 

            
        </div>
    </div>
  )
}

export default Appointments
