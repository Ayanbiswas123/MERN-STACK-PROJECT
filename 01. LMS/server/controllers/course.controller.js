import { Course } from '../model/course.model.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.aggregate([
            {
                $project: {
                    title: 1,
                    description: 1,
                    category: 1,
                    thumbnail: 1,
                    createdBy: 1,
                    lectures: { $slice: ["$lectures", 1] },  // This will include only the first lecture
                    numberOfLectures: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        if (!courses) {
            return next(new ApiError(400, "No courses available"));
        }

        res.status(200).json({
            success: true,
            message: "All courses are displayed",
            courses
        });
    } catch (error) {
        next(error);
    }
};


const getLectureByCourseId = async (req, res) => {

    try {
        const { id } = req.params;
        //console.log(id);
        const course = await Course.findById(id);

        //console.log(course);

        if (!course) {
            return next(new ApiError(400, "Invalid course Id"))
        }

        res.status(200).json({
            success: true,
            message: "Course Fetch Succesfully",
            lectures: course.lectures
        })
    } catch (error) {
        res.status(200).json({
            success: true,
            message: "Course is Empty",
            //lectures: course.lectures
        })
    }
}


const createCourse = async (req, res,next) => {
    const { title, description, category , createdBy} = req.body

    //console.log(req.user);
    //const createdBy = req.user.id;
    //console.log(createdBy);

    if (!title || !description || !category || !createdBy) {
        return next(new ApiError(400, 'All fiele are require'))
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy
    })

    if (!course) {
        return next(new ApiError(400, 'Course could not be created, please try again'))
    }


    if (req.file) {
        const thumbnailLocalPath = req.file?.path
        //console.log(thumbnailLocalPath);

        if (!thumbnailLocalPath) {
            return next(new ApiError(400, 'thumbnailLocalPath require'))
        }

        const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        //console.log(uploadedThumbnail);

        if (!uploadedThumbnail) {
            return next(new ApiError(400, 'Error in upload thumbnail, try again'))
        }

        course.thumbnail.secure_url = uploadedThumbnail.url || "";
    }

    await course.save();

    res.status(200).json({
        success:true,
        message:'Course created succesfully',
        course
    })



}

const updateCourse = async (req, res,next) => {
    const { title, description, category , createdBy} = req.body

    const {id} = req.params;

    if (!title || !description || !category || !createdBy) {
        return next(new ApiError(400, 'All fiele are require'))
    }

    const course = await Course.findById(id);

    if (!course) {
        return next(new ApiError(400, 'Course Not exist'))
    }


    if(title) course.title = title;
    if(description) course.description = description;
    if(category) course.category = category;
    if(createdBy) course.createdBy = createdBy;

    


    if (req.file) {
        console.log(req.file + "ss");
        const thumbnailLocalPath = req.file?.path
        console.log(thumbnailLocalPath);

        if (!thumbnailLocalPath) {
            return next(new ApiError(400, 'thumbnailLocalPath require'))
        }

        const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        //console.log(uploadedThumbnail);

        if (!uploadedThumbnail) {
            return next(new ApiError(400, 'Error in upload thumbnail, try again'))
        }

        course.thumbnail.secure_url = uploadedThumbnail.url || "";
    }else{
        
    }

    await course.save();

    res.status(200).json({
        success:true,
        message:'Course Updated succesfully',
        course
    })



}

const removeCourse = async (req, res,next) => {
    try {
        const {id} = req.params;
        const course = Course.findById(id);
    
        if(!course){
            return next(new ApiError(400,"Course not Exist with this Id"))
        }
    
        await Course.findByIdAndDelete(id)
    
        res.status(200).json({
            success:true,
            message:'Course Deleted Succesfully',
        })

    } catch (error) {
        return next(new ApiError(400,error.message))
    }
}


const addLectureToCourseById = async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
        return next(new ApiError(400, 'All fields (title, description) are required'));
    }

    try {
        const course = await Course.findById(id);

        if (!course) {
            return next(new ApiError(404, 'Course with the given ID does not exist'));
        }

        const lectureData = {
            title,
            description
        };

        if (req.file) {
            console.log(req.file);
            const thumbnailLocalPath = req.file.path;

            if (!thumbnailLocalPath) {
                return next(new ApiError(400, 'Uploaded file path not found'));
            }

            const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

            if (!uploadedThumbnail.secure_url || !uploadedThumbnail.public_id) {
                return next(new ApiError(400, 'Error in uploading thumbnail, please try again'));
            }

            lectureData.lecture = {
                secure_url: uploadedThumbnail.secure_url,
                public_id: uploadedThumbnail.public_id
            };
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture Successfully Added to Course',
            course
        });
    } catch (err) {
        next(err); // Pass any error to the error handling middleware
    }
};



const deleteLectureFromCourseById = async (req, res, next) => {
    const { courseId,lectureId } = req.query;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return next(new ApiError(404, 'Course not found'));
        }

        // Find the index of the lecture to delete
        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

        if (lectureIndex === -1) {
            return next(new ApiError(404, 'Lecture not found in this course'));
        }

        // Remove the lecture from the array
        course.lectures.splice(lectureIndex, 1);

        // Update the numberOfLectures field
        course.numberOfLectures = course.lectures.length;

        // Save the updated course
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture deleted successfully',
            course
        });
    } catch (error) {
        next(error);
    }
};

const addReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, rating, comment } = req.body;

        const course = await Course.findById(id);

        if (!course) {
            return next(new ApiError(400, "Invalid course ID"));
        }

        const newReview = {
            user,
            rating,
            comment,
            createdAt: new Date()
        };

        course.reviews.push(newReview);
        await course.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            reviews: course.reviews
        });
    } catch (error) {
        next(new ApiError(500, error.message));
    }
};

const addComment = async(req,res,next) => {
    const { courseId, lectureId } = req.params;
    const { user, comment } = req.body;
    console.log(user,comment);
    console.log(courseId,lectureId);

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new ApiError(400,'Course not found'))
        }

        const lecture = course.lectures.id(lectureId);
        if (!lecture) {
            return next(new ApiError(400,'Lecture not found'));
        }

        // Add the comment to the lecture
        lecture.comments.push({ user, comment });
        course.save();

        res.status(201).json({ 
            message: 'Comment added successfully', 
            course 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
}

const replyOnComment = async(req,res,next) => {
    const { courseId, lectureId, commentId } = req.params;
    const { user, comment } = req.body;
    console.log(user,comment);
    console.log(courseId,lectureId,commentId);

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new ApiError(400,'Course not found'))
        }

        const lecture = course.lectures.id(lectureId);
        if (!lecture) {
            return next(new ApiError(400,'Lecture not found'));
        }

        const commentToUpdate = lecture.comments.id(commentId);
        if (!commentToUpdate) {
            return next(new ApiError(400,"Comment not found"))
        }

        // Add the reply to the comment
        commentToUpdate.replies.push({ user, comment });
        course.save();

        res.status(201).json({ 
            message: 'Reply added successfully', 
            course 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
}





export {
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    deleteLectureFromCourseById,
    addReview,
    addComment,
    replyOnComment
}