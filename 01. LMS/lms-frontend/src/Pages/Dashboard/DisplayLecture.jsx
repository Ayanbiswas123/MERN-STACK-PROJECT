import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <div className="bg-base-100">
      <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
          <div className="text-center text-2xl font-semibold text-yellow-500">
            Course Name: {state?.title}
          </div>

          {(lectures && lectures.length > 0) ?
            (<div className="flex justify-center gap-10 w-full">
              {/* left section for playing videos and displaying course details to admin */}
              <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                <video
                  src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                  controls
                  disablePictureInPicture
                  muted
                  controlsList="nodownload"

                >
                </video>
                <div>
                  <h1>
                    <span className="text-yellow-500"> Title: {" "}
                    </span>
                    <span className=" text-white">
                      {lectures && lectures[currentVideo]?.title}
                    </span>

                  </h1>
                  <p className="text-white">
                    <span className="text-yellow-500 line-clamp-4">
                      Description: {" "}
                    </span>
                    {lectures && lectures[currentVideo]?.description}
                  </p>
                </div>
              </div>

              {/* right section for displaying list of lectres */}
              <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                  <p>Lectures list</p>
                  {role === "ADMIN" && (
                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                      Add new lecture
                    </button>
                  )}
                </li>
                {lectures &&
                  lectures.map((lecture, idx) => {
                    return (
                      <li className="space-y-2" key={lecture._id} >
                        <p className="cursor-pointer text-white" onClick={() => setCurrentVideo(idx)}>
                          <span className="text-yellow-500">
                            {" "} Lecture {idx + 1} : {" "}
                          </span>
                          {lecture?.title}
                        </p>
                        {role === "ADMIN" && (
                          <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Delete lecture
                          </button>
                        )}
                      </li>
                    )
                  })
                }
              </ul>
            </div>) : (
              role === "ADMIN" && (
                <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Add new lecture
                </button>
              )
            )}
        </div>
      </HomeLayout>
    </div>
  );
}

export default Displaylectures;


