import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { newAppointment, getOneAppointment, updateAppointment } from '../../api/appointments/appointmentApi'
import dayjs from 'dayjs'

dayjs().format()

export const createAppointment = createAsyncThunk(
    'appointment/newAppointment',
    async (data) => {
      // console.log('dataCreated',data);
      const response = await newAppointment(data);
      // The value we return becomes the `fulfilled` action payload
      // console.log('response',response);
      if (response.status === 200) {
        return {status: 200};
      }
      
    }
)
export const updateOne = createAsyncThunk(
    'appointment/updateOne',
    async (item) => {
      // console.log('dataupload', item.values, item.code);
      const response = await updateAppointment(item.code, item.values);
      // The value we return becomes the `fulfilled` action payload
      // console.log('response',response);
      if (response.status === 200) {
        return {status: 200};
      }
      
    }
)
export const findOne = createAsyncThunk(
    'appointment/finddOne',
    async (data) => {
      const response =  getOneAppointment(data);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
)

export const newAppmentSlice = createSlice({
    name: 'newAppointment',
    initialState :{ 
        data: {
            
        },
        status: 'idle'
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(createAppointment.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createAppointment.fulfilled, (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
        })
        .addCase(updateOne.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOne.fulfilled, (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
        })
        .addCase(findOne.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(findOne.fulfilled, (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
          state.data.appointment_date = dayjs(state.data.appointment_date, 'DD/MM/YYYY')
          state.data.request_date = dayjs(state.data.request_date, 'DD/MM/YYYY')
          state.data.appointment_time = dayjs(state.data.appointment_time)
        });
    },
})

export default newAppmentSlice.reducer