import { ALL_APPOINTMENTS } from './type'

const initalState = []

const appointmentReducer = (state = initalState, action) => {
    switch (action.type) {
        case ALL_APPOINTMENTS:
            
            break;
    
        default: return state
    }
}

export default appointmentReducer