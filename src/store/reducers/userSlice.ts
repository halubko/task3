import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IError} from "../../models/IError";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: IError;
}

const initialState: UserState = {
    user: {
        id: 0,
        email: "",
        password: "",
        accessToken: "",
        refreshToken: "",
    },
    isLoading: false,
    error: {
        status: 0,
        message: ""
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        usersFetching(state){
            state.isLoading = true;
        },
        usersFetchingSuccess(state, action: PayloadAction<IUser>){
            state.isLoading = false;
            state.error = {status: 0, message: ""};
            state.user = action.payload;
        },
        usersFetchingError(state, action: PayloadAction<IError>){
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;