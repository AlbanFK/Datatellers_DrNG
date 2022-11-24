import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './appointment/appointmentrSlice'
import newAppmentRducer from './appointment/newAppmentSlice'

const store = configureStore({
    reducer: {
        appointment: appointmentReducer,
        newAppointment: newAppmentRducer
    }
  })

export default store