import actionTypes from './actionTypes';
import {
    createNewPolicyFunc,getAllPolicy, 
    deletePolicyFunc, editPolicyFunc, 
    getAllDetailPolicy, saveDetailPolicyService,
    getAllPolicyPageService
}
    from '../../services/policyService';
import { toast } from "react-toastify";

export const createNewPolicy = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewPolicyFunc(data);
            if (res && res.errCode === 0) {
                toast.success("Tạo sản phẩm thành công");
                dispatch(savePolicySuccess());
                dispatch(fetchAllPolicyStart());
            } else {
                dispatch(savePolicyFailed());
            }
        } catch (e) {
            dispatch(savePolicyFailed());
            console.log('savePolicyFailed error', e)
        }
    }
}

export const savePolicySuccess = () => ({
    type: actionTypes.CREATE_POLICY_SUCCESS
})

export const savePolicyFailed = () => ({
    type: actionTypes.CREATE_POLICY_FAILED
})

export const fetchAllPolicyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPolicy("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllPolicySuccess(res.policies));
            } else {
                toast.success("Lấy sản phẩm thất bại");
                dispatch(fetchAllPolicyFailed());
            }
        } catch (e) {
            toast.success("Lấy sản phẩm thất bại");
            dispatch(fetchAllPolicyFailed());
            console.log('fetchAllPolicyFailed error', e)
        }
    }
}

export const fetchAllPolicySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_POLICY_SUCCESS,
    policies: data
})

export const fetchAllPolicyFailed = () => ({
    type: actionTypes.FETCH_ALL_POLICY_FAILED
})

export const deletePolicy = (policyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deletePolicyFunc(policyId);
            if (res && res.errCode === 0) {
                toast.success("Xóa sản phẩm thành công");
                dispatch(deletePolicySuccess());
                dispatch(fetchAllPolicyStart());
            } else {
                toast.error("Xóa sản phẩm thất bại");
                dispatch(deletePolicyFailed());
            }
        } catch (e) {
            dispatch(deletePolicyFailed());
            console.log('deletePolicyFailed error', e)
        }
    }
}

export const deletePolicySuccess = () => ({
    type: actionTypes.DELETE_POLICY_SUCCESS
})

export const deletePolicyFailed = () => ({
    type: actionTypes.DELETE_POLICY_FAILED
})

export const editPolicy = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editPolicyFunc(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật sản phẩm thành công");
                dispatch(editPolicySuccess());
                dispatch(fetchAllPolicyStart());
            } else {
                toast.error("Cập nhật sản phẩm thất bại");
                dispatch(editPolicyFailed());
            }
        } catch (e) {
            toast.error("Cập nhật sản phẩm thất bại");
            dispatch(editPolicyFailed());
            console.log('editPolicyFailed error', e)
        }
    }
}

export const editPolicySuccess = () => ({
    type: actionTypes.EDIT_POLICY_SUCCESS
})

export const editPolicyFailed = () => ({
    type: actionTypes.EDIT_POLICY_FAILED
})

export const fetchAllPolicyPage = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPolicyPageService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_POLICY_PAGE_SUCCESS,
                    dataAllPolicy: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_POLICY_PAGE_FAILED,
                })
            }
        } catch (e) {
            console.log('Fetch all policy failed: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_POLICY_PAGE_FAILED,
            })
        }
    }
}

export const fetchAllDetailPolicy = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDetailPolicy();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DETAIL_POLICY_SUCCESS,
                    dataAllDetailPolicy: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DETAIL_POLICY_FAILED,
                })
            }
        } catch (e) {
            console.log('Fetch all detail Policy failed: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DETAIL_POLICY_FAILED,
            })
        }
    }
}

export const saveDetailPolicy = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailPolicyService(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail Policy success")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_POLICY_SUCCESS,
                })
            }
            else {
                toast.error("Save detail Policy fail")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_POLICY_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save detail Policy fail")
            dispatch({
                type: actionTypes.SAVE_DETAIL_POLICY_FAILED,
            })
        }
    }
}
