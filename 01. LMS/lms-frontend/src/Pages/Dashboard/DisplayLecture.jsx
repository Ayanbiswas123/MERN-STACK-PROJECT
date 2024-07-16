
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import HomeLayout from "../../Layouts/HomeLayout";
// import { addComment, addReply, deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

// function DisplayLectures() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { state } = useLocation();
//   const { lectures } = useSelector((state) => state.lecture);
//   const { data, role } = useSelector((state) => state.auth);



//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [commentText, setCommentText] = useState('');
//   const [replyText, setReplyText] = useState('');
//   const [currentCommentId, setCurrentCommentId] = useState(null);
//   const [show, setShow] = useState(false)

//   useEffect(() => {
//     console.log(state);
//     if (!state) navigate("/courses");
//     dispatch(getCourseLectures(state._id));
//   }, []);

//   async function onLectureDelete(courseId, lectureId) {
//     console.log(courseId, lectureId);
//     await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
//     await dispatch(getCourseLectures(courseId));
//   }
//   async function handleAddComment(courseId, lectureId) {
//     const parsedData = JSON.parse(JSON.parse(data));
//     console.log(courseId, lectureId);
//     console.log(parsedData + "aa");

//     await dispatch(addComment({ courseId, lectureId, user: parsedData.fullName, comment: commentText }));
//     setCommentText('');
//   }

//   async function handleReplyComment(courseId, lectureId, commentId) {
//     const parsedData = JSON.parse(JSON.parse(data));
//     console.log(courseId, lectureId, commentId);
//     console.log(parsedData.fullName, replyText);

//     await dispatch(addReply({ courseId, lectureId, commentId, user: parsedData.fullName, comment: replyText }));
//     setReplyText('');
//     setCurrentCommentId(null);
//   }

//   const toggleReplies = () => {
//     setShow(!show);
//   };

//   return (
//     <div className="bg-base-100">
//       <HomeLayout>
//         <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
//           <div className="text-center text-2xl font-semibold text-yellow-500">
//             Course Name: {state?.title}
//           </div>

//           {lectures && lectures.length > 0 ? (
//             <div className="flex justify-center gap-10 w-full">
//               {/* Left section for playing videos and displaying course details to admin */}
//               <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
//                 <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
//                   <p>Lectures list</p>
//                   {role === "ADMIN" && (
//                     <button
//                       onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//                       className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                     >
//                       Add new lecture
//                     </button>
//                   )}
//                 </li>
//                 {lectures.map((lecture, idx) => (
//                   <li className="space-y-2" key={lecture._id}>
//                     <p className="cursor-pointer text-white" onClick={() => setCurrentVideo(idx)}>
//                       <span className="text-yellow-500"> Lecture {idx + 1} : </span>
//                       {lecture?.title}
//                     </p>
//                     {role === "ADMIN" && (
//                       <button
//                         onClick={() => onLectureDelete(state?._id, lecture?._id)}
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//                       >
//                         Delete lecture
//                       </button>
//                     )}
//                   </li>
//                 ))}
//               </ul>

//               {/* Right section for displaying video and comments */}
//               <div className="space-y-5 w-[70%] p-2 rounded-lg shadow-[0_0_10px_black]">
//                 <video
//                   src={lectures && lectures[currentVideo]?.lecture?.secure_url}
//                   className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//                   controls
//                   disablePictureInPicture
//                   muted
//                   controlsList="nodownload"
//                 ></video>
//                 <div>
//                   <h1>
//                     <span className="text-yellow-500"> Title: </span>
//                     <span className="text-white">{lectures && lectures[currentVideo]?.title}</span>
//                   </h1>
//                   <p className="text-white">
//                     <span className="text-yellow-500 line-clamp-4"> Description: </span>
//                     {lectures && lectures[currentVideo]?.description}
//                   </p>

//                   {/* Comment section */}
//                   <div>
//                     {/* Add comment input */}
//                     <div className="flex mt-2">
//                       <input
//                         type="text"
//                         className="flex-1 p-2 mr-[20px] rounded-lg text-black"
//                         value={commentText}
//                         onChange={(e) => setCommentText(e.target.value)}
//                         placeholder="Add a comment..."
//                       />
//                       <button
//                         onClick={() => handleAddComment(state?._id, lectures[currentVideo]?._id)}
//                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//                       >
//                         Add Comment
//                       </button>
//                     </div>

//                     {/*display comments*/}

//                     {lectures[currentVideo]?.comments.map((comment) => (
//                       <div key={comment._id} className="mt-2 border rounded-lg p-3">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <p className="mb-1 text-xl">{comment.user}</p>
//                             <p className="mb-1">{comment.comment}</p>
//                           </div>
//                           {/* Toggle button for replies */}
//                           <button
//                             onClick={toggleReplies}
//                             className="flex-shrink-0 text-white hover:text-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl px-2 py-1 mb-2 focus:outline-none flex items-center"
//                           >
//                             {show ? '↑' : '↓'}
//                           </button>
//                         </div>

//                         {/* Reply section for each comment */}

//                         {show && <div className="flex mt-2">
//                           <input
//                             type="text"
//                             className="flex-1 p-2 mr-[20px] rounded-lg text-black"
//                             value={currentCommentId === comment._id ? replyText : ''}
//                             onChange={(e) => {
//                               setCurrentCommentId(comment._id);
//                               setReplyText(e.target.value);
//                             }}
//                             placeholder="Reply to this comment..."
//                           />
//                           <button
//                             onClick={() => handleReplyComment(state._id, lectures[currentVideo]._id, comment._id)}
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//                           >
//                             Reply
//                           </button>
//                         </div>}
//                         {/* Display replies for this comment */}

//                         {show && comment.replies.map((reply) => (
//                           <div key={reply._id} className="mt-2 ml-8 border rounded-lg p-3">
//                             <p className="mb-1">{reply.user}</p>
//                             <p className="mb-1">{reply.comment}</p>
//                           </div>
//                         ))}
//                       </div>
//                     ))}




//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             role === "ADMIN" && (
//               <button
//                 onClick={() => navigate("/course/addlecture", { state: { ...state } })}
//                 className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//               >
//                 Add new lecture
//               </button>
//             )
//           )}
//         </div>
//       </HomeLayout>
//     </div>
//   );
// }

// export default DisplayLectures;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addComment, addReply, deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { data, role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, [dispatch, state, navigate]);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
  }

  async function handleAddComment(courseId, lectureId) {
    const parsedData = JSON.parse(JSON.parse(data));
    console.log(courseId, lectureId);
    console.log(parsedData + "aa");

    await dispatch(addComment({ courseId, lectureId, user: parsedData.fullName, comment: commentText }));
    setCommentText('');
  }

  async function handleReplyComment(courseId, lectureId, commentId) {
    const parsedData = JSON.parse(JSON.parse(data));
    console.log(courseId, lectureId, commentId);
    console.log(parsedData.fullName, replyText);

    await dispatch(addReply({ courseId, lectureId, commentId, user: parsedData.fullName, comment: replyText }));
    setReplyText('');
    setCurrentCommentId(null);
  }

  const toggleReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };

  return (
    <div className="bg-base-100">
      <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
          <div className="text-center text-2xl font-semibold text-yellow-500">
            Course Name: {state?.title}
          </div>

          {lectures && lectures.length > 0 ? (
            <div className="flex justify-center gap-10 w-full">
              {/* Left section for playing videos and displaying course details to admin */}
              <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                  <p>Lectures list</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Add new lecture
                    </button>
                  )}
                </li>
                {lectures.map((lecture, idx) => (
                  <li className="space-y-2" key={lecture._id}>
                    <p className="cursor-pointer text-white" onClick={() => setCurrentVideo(idx)}>
                      <span className="text-yellow-500"> Lecture {idx + 1} : </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() => onLectureDelete(state?._id, lecture?._id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Delete lecture
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Right section for displaying video and comments */}
              <div className="space-y-5 w-[70%] p-2 rounded-lg shadow-[0_0_10px_black]">
                <video
                  src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                  controls
                  disablePictureInPicture
                  muted
                  controlsList="nodownload"
                ></video>
                <div>
                  <h1>
                    <span className="text-yellow-500"> Title: </span>
                    <span className="text-white">{lectures && lectures[currentVideo]?.title}</span>
                  </h1>
                  <p className="text-white">
                    <span className="text-yellow-500 line-clamp-4"> Description: </span>
                    {lectures && lectures[currentVideo]?.description}
                  </p>

                  {/* Comment section */}
                  <div>
                    {/* Add comment input */}
                    <div className="flex mt-2">
                      <input
                        type="text"
                        className="flex-1 p-2 mr-[20px] rounded-lg text-black"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                      />
                      <button
                        onClick={() => handleAddComment(state?._id, lectures[currentVideo]?._id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Add Comment
                      </button>
                    </div>

                    {/* Display comments */}
                    {lectures[currentVideo]?.comments.map((comment) => (
                      <div key={comment._id} className="mt-2 border rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="mb-1 text-xl">{comment.user}</p>
                            <p className="mb-1">{comment.comment}</p>
                          </div>
                          {/* Toggle button for replies */}
                          <button
                            onClick={() => toggleReplies(comment._id)}
                            className="flex-shrink-0 text-white hover:text-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl px-2 py-1 mb-2 focus:outline-none flex items-center"
                          >
                            {showReplies[comment._id] ? '↑' : '↓'}
                          </button>
                        </div>

                        {/* Reply section for each comment */}
                        {showReplies[comment._id] && (
                          <div className="flex mt-2">
                            <input
                              type="text"
                              className="flex-1 p-2 mr-[20px] rounded-lg text-black"
                              value={currentCommentId === comment._id ? replyText : ''}
                              onChange={(e) => {
                                setCurrentCommentId(comment._id);
                                setReplyText(e.target.value);
                              }}
                              placeholder="Reply to this comment..."
                            />
                            <button
                              onClick={() => handleReplyComment(state._id, lectures[currentVideo]._id, comment._id)}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Reply
                            </button>
                          </div>
                        )}

                        {/* Display replies for this comment */}
                        {showReplies[comment._id] &&
                          comment.replies.map((reply) => (
                            <div key={reply._id} className="mt-2 ml-8 border rounded-lg p-3">
                              <p className="mb-1">{reply.user}</p>
                              <p className="mb-1">{reply.comment}</p>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            role === "ADMIN" && (
              <button
                onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add new lecture
              </button>
            )
          )}
        </div>
      </HomeLayout>
    </div>
  );
}

export default DisplayLectures;
