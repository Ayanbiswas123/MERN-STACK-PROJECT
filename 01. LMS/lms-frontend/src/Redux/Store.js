import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import paymentSliceReducer from "./Slices/PaymentSlice";
import lectureSliceReducer from "./Slices/LectureSlice";

 const store = configureStore({
    reducer:{
        auth:AuthSliceReducer,
        course: courseSliceReducer,
        payments: paymentSliceReducer,
        lecture : lectureSliceReducer
    },
    devTools:true
 })

 export default  store;