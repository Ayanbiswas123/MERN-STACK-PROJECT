import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";
import { FaPlayCircle } from "react-icons/fa";

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { role } = useSelector((state) => state.auth);

    const data1 = localStorage.getItem("data");
    const subscriptionStatus = JSON.parse(data1)?.subscription?.status || "";

    const handleDeleteCourse = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete this course?");
        if (userConfirmed) {
            await dispatch(deleteCourse(state._id));
            navigate("/courses");
        }
    };

    const handleUpdateCourse = () => {
        navigate(`/course/update`, { state: { ...state } });
    };

    const [showVideoModal, setShowVideoModal] = useState(false);

    const openVideoModal = () => {
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
    };

    //console.log(state.lectures[0].lecture.secure_url);
    return (
        <HomeLayout>
            <div className="bg-gray-900 min-h-[90vh] pt-12 px-4 md:px-20 flex flex-col items-center text-white">
                <div className="w-full max-w-screen-xl xlarge:mx-auto py-3">
                    <nav className="text-sm text-gray-400 mb-4">
                        <Link to="/" className="hover:underline">Home</Link> &gt;
                        <Link to="/courses" className="hover:underline"> Courses</Link> &gt;
                        <span className="text-yellow-500">{state?.title}</span>
                    </nav>
                    <div className="flex flex-col w-full md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="space-y-4 mb-6">
                                <h1 className="text-4xl font-bold text-yellow-500">{state?.title}</h1>
                                <p className="text-lg">{state?.description}</p>
                                <p className="text-lg font-semibold">
                                    <span className="text-yellow-500 font-bold">Total lectures: </span>
                                    {state?.numberOfLectures}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-yellow-500 font-bold">Instructor: </span>
                                    {state?.createdBy}
                                </p>
                                <p className="text-2xl text-white">Yearly Subscription</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-4 pt-3">
                                {role === "ADMIN" || subscriptionStatus === "active" ? (
                                    <button
                                        onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
                                        className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full md:w-auto hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                    >
                                        Watch lectures
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full md:w-auto hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                    >
                                        Subscribe
                                    </button>
                                )}
                                {role === "ADMIN" && (
                                    <>
                                        <button
                                            onClick={handleDeleteCourse}
                                            className="bg-red-600 text-xl rounded-md font-bold px-5 py-3 w-full md:w-auto hover:bg-red-500 transition-all ease-in-out duration-300 mt-4 md:mt-0"
                                        >
                                            Delete Course
                                        </button>
                                        <button
                                            onClick={handleUpdateCourse}
                                            className="bg-blue-600 text-xl rounded-md font-bold px-5 py-3 w-full md:w-auto hover:bg-blue-500 transition-all ease-in-out duration-300 mt-4 md:mt-0"
                                        >
                                            Update Course
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="order-1 md:order-2 ml-6">
                            <div className="relative">
                                <img
                                    className="w-full rounded-lg mb-6"
                                    alt="thumbnail"
                                    src={state?.thumbnail?.secure_url}
                                />
                                <FaPlayCircle onClick={openVideoModal} className="text-white text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 large:px-20 max-w-screen-xl xlarge:mx-auto py-3">
                <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-4 pt-3">
                    <div className="flex flex-col items-center text-center px-8 py-4 medium:p-0 medium:pr-9 medium:border-r medium:border-stroke-300 medium:gap-y-2">
                        <h4 className="text-gray-900 text-lg medium:text-xl leading-[26px] medium:leading-[30px] font-interSans font-bold">Job Assistance</h4>
                        <p className="text-sm medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-650 text-[14px] text-center">Program</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-8 py-4 medium:p-0 medium:pr-9 medium:border-r medium:border-stroke-300 medium:gap-y-2">
                        <h4 className="text-gray-900 text-lg medium:text-xl leading-[26px] medium:leading-[30px] font-interSans font-bold">29 June 2024</h4>
                        <p className="text-sm medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-650 text-[14px] text-center">Date of Commencement</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-8 py-4 medium:p-0 medium:pr-9 medium:border-r medium:border-stroke-300 medium:gap-y-2">
                        <h4 className="text-gray-900 text-lg medium:text-xl leading-[26px] medium:leading-[30px] font-interSans font-bold">6 Months</h4>
                        <p className="text-sm medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-650 text-[14px] text-center">Duration</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-8 py-4 medium:p-0 medium:pr-9 medium:border-r medium:border-stroke-300 medium:gap-y-2">
                        <h4 className="text-gray-900 text-lg medium:text-xl leading-[26px] medium:leading-[30px] font-interSans font-bold">Live + Recorded</h4>
                        <p className="text-sm medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-650 text-[14px] text-center">Delivery Mode</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-8 py-4 medium:p-0 medium:pr-9 medium:border-stroke-300 medium:gap-y-2">
                        <h4 className="text-gray-900 text-lg medium:text-xl leading-[26px] medium:leading-[30px] font-interSans font-bold">English</h4>
                        <p className="text-sm medium:text-base leading-[21px] medium:leading-6 font-normal text-gray-650 text-[14px] text-center">Language</p>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-10 relative m-60">
                        <p className="text-red-500 text-center font-bold text-3xl pb-2">
                            Introduction
                        </p>

                        <iframe
                            title="Course Video"
                            width="560"
                            height="315"
                            src={
                                state.lectures && state.lectures.length > 0 && state.lectures[0].lecture
                                    ? state.lectures[0].lecture.secure_url
                                    : state?.thumbnail?.secure_url
                            }
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <button
                            onClick={closeVideoModal}
                            className="absolute top-0 right-0 m-4 text-lg font-bold text-red-500 hover:text-gray-700 cursor-pointer"
                        >
                            &#x2715;
                        </button>
                    </div>
                </div>

            )}
        </HomeLayout>
    );
}

export default CourseDescription;
