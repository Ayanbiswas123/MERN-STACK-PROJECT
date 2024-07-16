import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures :[]
}

export const getCourseLectures = createAsyncThunk("course/lecture/get", async (cid) =>{
    try {
        const response = axiosInstance.get(`/courses/${cid}`)
        toast.promise(response,{
            loading:"Fetching course lectures",
            success:"Lecture fetched succesfully",
            error:"Failed to load lecture"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addCourseLecture = createAsyncThunk("course/lecture/add", async (data) =>{
    try {
        const formData = new FormData();
        formData.append("lectureThumbnail", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);


        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response,{
            loading:"adding course lectures",
            success:"Lecture added succesfully",
            error:"Failed to add the lecture"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const deleteCourseLecture = createAsyncThunk("course/lecture/delete", async (data) =>{
    try {
    
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"deleting course lectures",
            success:"Lecture deleted succesfully",
            error:"Failed to delete the lecture"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const addComment = createAsyncThunk('comments/addComment',async (data) => {

      const { courseId, lectureId, user, comment } = data;
  
      try {
        const response = axiosInstance.post(
          `/courses/course/${courseId}/lectures/${lectureId}/comments`,
          { user, comment }
        );
        toast.promise(response,{
            loading:"Mssage sending.....",
            success:"Mssage send succesfully",
            error:"Failed to Send the Message"
        })
        window.location.reload();
        return (await response.data);
        
      } catch (error) {
        throw new Error(`Error adding comment: ${error.message}`);
      }
    }
);

export const addReply = createAsyncThunk('comments/addReply',async (data) => {
    
    const { courseId, lectureId, commentId, user, comment } = data;

    try {
      const response = await axiosInstance.post(
        `/courses/course/${courseId}/lectures/${lectureId}/reply/${commentId}`,
        { user, comment }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error adding comment: ${error.message}`);
    }
  }
);





const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.course?.lectures;
        })
    
    }
})




export default lectureSlice.reducer;