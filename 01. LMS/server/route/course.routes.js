import { Router } from "express"
import { addLectureToCourseById, createCourse, deleteLectureFromCourseById, getAllCourses, getLectureByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
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




export default router;