import { Router } from "express"
import { addComment, addLectureToCourseById, addReview, createCourse, deleteLectureFromCourseById, getAllCourses, getLectureByCourseId, removeCourse, replyOnComment, updateCourse } from "../controllers/course.controller.js";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/')
.get(getAllCourses)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
)
.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    deleteLectureFromCourseById
);



router.route('/:id')
.get(isLoggedIn ,authorizedSubscriber,getLectureByCourseId)
.put(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    updateCourse)
.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeCourse
)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lectureThumbnail'),
    addLectureToCourseById
)

router.route('/:id/review')
.post(isLoggedIn ,authorizedSubscriber,addReview)
//add comment on perticuler lecture
router.route('/course/:courseId/lectures/:lectureId/comments')
.post(isLoggedIn ,authorizedSubscriber,addComment)

//add reply on perticular comment
router.route('/course/:courseId/lectures/:lectureId/reply/:commentId')
.post(isLoggedIn ,authorizedSubscriber,replyOnComment)




export default router;