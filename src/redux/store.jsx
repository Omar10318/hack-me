import { createStore } from 'redux';


const initialState = {
    desks: {},
    employees: {}
}

const rootReducer = (state = initialState, action) => {
    let latestId;
    switch (action.type) {
        case 'SET_DESK':
            const { desks } = state;
            if (action.deskId) {
                return { ...state, desks: { ...desks, [action.deskId]: action.deskName } }
            }
            latestId = Object.keys(desks).length > 0 ? parseInt(Object.keys(desks).pop()) : 0;
            return { ...state, desks: { ...desks, [latestId + 1]: action.deskName } };
        case 'SET_EMPLOYEE':
            const { employees } = state;
            const newObject = { email: action.email, name: action.name, preferedDesks: action.preferedDesks, assignedDesk: action.assignedDesk };
            if (action.id) {
                return { ...state, employees: { ...employees, [action.id]: newObject } };
            }
            latestId = Object.keys(employees).length > 0 ? parseInt(Object.keys(employees).pop()) : 1;
            return { ...state, employees: { ...employees, [latestId + 1]: newObject } };
        default:
            return state
    }
}

const store = createStore(rootReducer)

export default store