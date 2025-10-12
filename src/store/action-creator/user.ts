import {AppDispatch} from "../store";
import axios from "axios";
import {IUser} from "../../models/IUser";
import {userSlice} from "../reducers/userSlice";

interface ILoginPayload {
    username: string;
    password: string;
}

export const loginUsers = (payload: ILoginPayload) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching())
        const response = await axios.post<IUser>('https://dummyjson.com/auth/login',{
            username: payload.username,
            password: payload.password,
        })
        dispatch(userSlice.actions.usersFetchingSuccess(response.data))
    } catch (e){
        dispatch(userSlice.actions.usersFetchingError(e.message))
    }
}