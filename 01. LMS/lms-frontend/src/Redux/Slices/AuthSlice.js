import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from '../../Helpers/axiosInstance'
import toast from "react-hot-toast";

const initialState = {
    //isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    role: localStorage.getItem('role') || "",
    status:localStorage.getItem('status') || "",
    data: JSON.stringify(localStorage.getItem('data')) || {},
    

}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("/user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login"
        });
        
        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async() => {

    try {
        const res = axiosInstance.get("/user/logout");
        toast.promise(res, {
            loading: "Wait! Logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Logout"
        });
        return (await res).data;

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})



export const updateProfile = createAsyncThunk("/user/update/profile", async (formData) => {
    try {
        const res = axiosInstance.put("user/update", formData);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const changePassword = createAsyncThunk("/user/update/password", async (data) => {
    const {oldPassword, newPassword} = data
    //console.log(data);
    //console.log(oldPassword, newPassword);
    try {
        const res = axiosInstance.post("user/changepassword", {oldPassword,newPassword});
        toast.promise(res, {
            loading: "Wait! Password update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

export const forgotPassword = createAsyncThunk("/user/update/forgot-password", async (data) => {
    const {email, newPassword} = data
    console.log(data);
    console.log(email, newPassword);
    try {
        const res = axiosInstance.post("user/forgot-password", {email,newPassword});
        toast.promise(res, {
            loading: "Wait! Password update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            //console.log(action?.payload?.user?.role,"hello");

            if(action?.payload?.user){
                localStorage.setItem("data",JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("role",action?.payload?.user?.role);
                localStorage.setItem("status",action?.payload?.user?.subscription?.status);

                state.data = action?.payload?.user;
                state.isLoggedIn = true;
                state.role = action?.payload?.user?.role;
                state.status = action?.payload?.user?.subscription?.status;
            }

            
        }) 
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
            state.status = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
    }
});


export default authSlice.reducer;