import React, { createContext, useReducer, useContext } from "react";
 
const initialState = {
    answers: {
        loading: false,
        data: null,
        error: null
    },
    question: {
        loading: false,
        data: null,
        error: null
    }

};

const loadingState = {
    loading: true,
    data: null,
    error: null
    
};

const success = data => ({
    loading: false,
    data,
    error: null
});

const error = error => ({
    loading: false,
    data: null,
    error: error
});

function questionsReducer(state, action) {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return {
                ...state,
                questions: loadingState
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                questions: success(action.data.RESULT)
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };
        default:
            throw new Error(`Unhanded action type: ${action.type}`);
    }
}

const QuestionsState