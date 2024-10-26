const initialState = {
    students: [],
};

//students reducer
export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_STUDENTS':
            return { ...state, students: action.payload };
        case 'DELETE_STUDENT':
            return { ...state, students: state.students.filter(student => student._id !== action.payload) };
        case 'UPDATE_EXAM_PERMISSION':
            return {
                ...state,
                students: state.students.map(student =>
                    student._id === action.payload.id ? { ...student, examPermission: action.payload.permission } : student
                ),
            };
        default:
            return state;
    }
};
