import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;

    } catch (error) {
        toast.error("Failed to load data");
    }
})


export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async (data) => {
    try {
        const response = axiosInstance.post("/payments/subscribe", { pay: data });
        toast.promise(response, {
            loading: "payment in progress...",
            success: `${(await response).data.message}`
        });
        console.log((await response).data);
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


export const verifyUserPayment = createAsyncThunk("/payments/verify", async () => {
    try {
        const response = axiosInstance.post("/payments/verify");

        toast.promise(response, {
            loading: "Verification in progress...",
            success: `${(await response).data.message}`
        });
        console.log((await response).data);
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (data) => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100",);
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payment records"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation failed");
    }
});


const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled,(state, action) => {
                // console.log(action);
                // toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
                // localStorage.setItem("data",JSON.stringify(action?.payload?.user))
                // localStorage.setItem("status",action?.payload?.user?.subscription?.status)

            })







            .addCase(verifyUserPayment.rejected, (state, action) => {
                console.log(action);
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
});

export default paymentSlice.reducer;