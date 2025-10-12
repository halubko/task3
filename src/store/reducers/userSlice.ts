import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
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
    error: '',
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
            state.error = '';
            state.user = action.payload;
        },
        usersFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;