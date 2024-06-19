import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect, useState } from "react";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";

function CourseDescription() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { role } = useSelector((state) => state.auth);

    const data1 = localStorage.getItem("data")
    const subscriptionStatus = JSON.parse(data1)?.subscription?.status || "";
    //console.log(subscriptionStatus + "aa");


    const handleDeleteCourse = async () => {
        // Display an alert dialog with two buttons: Yes and No
        const userConfirmed = window.confirm("Are you sure you want to delete this course?");
        
        if (userConfirmed) {
            await dispatch(deleteCourse(state._id));
            navigate("/courses"); 
        }
    };
    
    const handleUpdateCourse = () => {
        navigate(`/course/update`,{ state: { ...state } }); // Redirect to update course component with course ID
    };

    return (
        <HomeLayout>
            <div className="bg-base-100 min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-rows-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img
                            className="w-full h-64"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>

                            </div>

                            {role === "ADMIN" || subscriptionStatus === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", { state: { ...state } })} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Watch lectures
                                </button>
                            ) : (
                                <button onClick={() => navigate("/checkout")} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                    Subscribe
                                </button>
                            )}

                            {role === "ADMIN" && (
                                <button onClick={handleDeleteCourse} className="bg-red-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-500 transition-all ease-in-out duration-300 mt-4">
                                    Delete Course
                                </button>
                            )}
                            {role === "ADMIN" && (
                                <button onClick={handleUpdateCourse} className="bg-red-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-500 transition-all ease-in-out duration-300 mt-4">
                                    Update Course
                                </button>
                            )}
                        </div>


                    </div>

                    <div className="space-y-2 text-xl">
                        <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500">Course description: </p>
                        <p>{state?.description}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;   