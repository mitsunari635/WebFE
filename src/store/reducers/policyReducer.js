import actionTypes from '../actions/actionTypes';

const initialState = {
    policies: [],
    allDetailPolicy: [],
    allPoliciesPage: [],
}

const policyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_POLICY_SUCCESS:
            state.policies = action.policies;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_POLICY_FAILED:
            state.policies = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_POLICY_PAGE_SUCCESS:
            state.allPoliciesPage = action.dataAllPolicy;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_POLICY_PAGE_FAILED:
            state.allPoliciesPage = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DETAIL_POLICY_SUCCESS:
            state.allDetailPolicy = action.dataAllDetailPolicy;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DETAIL_POLICY_FAILED:
            state.allDetailPolicy = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default policyReducer;