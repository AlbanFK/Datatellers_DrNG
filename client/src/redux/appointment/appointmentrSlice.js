import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllAppointments } from '../../api/appointments/appointmentApi'

export const allAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async () => {
    const response = await getAllAppointments();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
)

// const recap = (data) => {
//   let missedCounter = 0
//   let passedCounter = 0
//   let recheduledCounter = 0
//   data.map(item => {
//     switch (item.status) {
//       case 'missed':
//         missedCounter++
//         break;
//       case 'Passed':
//         passedCounter++
//         break;
//       case 'recheduled':
//         recheduledCounter++
//         break;
    
//       default:
//         break;
//     }
//   })
//   return [
//     {
//       type: 'missed',
//       number: missedCounter
//     },
//     {
//       type: 'recheduled',
//       number: recheduledCounter
//     },
//     {
//       type: 'passed',
//       number: passedCounter
//     },
//     ]
// }

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState : {
      status: 'idle',
      data: [],
      recap: [],
    },
    reducers: {
      recap: state => {
        let data = state.data
        let missedCounter = 0
        let passedCounter = 0
        let recheduledCounter = 0

        console.log('test', data);
        data.map(item => {
          switch (item.status) {
            case 'missed':
              missedCounter += 1
              console.log('', missedCounter);
              break;
            case 'Passed':
              passedCounter++
              break;
            case 'recheduled':
              recheduledCounter++
              break;
          
            default:
              break;
          }
        })
        state.recap =[
          {
            type: 'missed',
            number: missedCounter
          },
          {
            type: 'recheduled',
            number: recheduledCounter
          },
          {
            type: 'passed',
            number: passedCounter
          },
        ]
      },
      clear: state => {
        state.data = []
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(allAppointments.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(allAppointments.fulfilled, (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
        });
    },
  })

  export const { recap, clear } = appointmentSlice.actions

  export default appointmentSlice.reducer