import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// export const addCourses = createAsyncThunk("/course/get", async () => {
//     try {
//         const response = axiosInstance.get("/courses");
//         toast.promise(response, {
//             loading: "loading course data...",
//             success: "Courses loaded successfully",
//             error: "Failed to get the courses",
//         });

//         return (await response).data.courses;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// });


export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});



export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateCourseDetails = createAsyncThunk("/course/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.put(`/courses/${id}`, formData);
        toast.promise(response, {
            loading: "Updating course...",
            success: "Course updated successfully",
            error: "Failed to update course",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.courseData = action.payload;
            })
            .addCase(updateCourseDetails.fulfilled, (state, action) => {
                const index = state.courseData.findIndex(course => course._id === action.payload._id);
                if (index !== -1) {
                    state.courseData[index] = action.payload;
                }
            });
    },
});

export default courseSlice.reducer;