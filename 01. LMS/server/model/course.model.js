import { model, Schema } from 'mongoose';

const replySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const commentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [replySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const lectureSchema = new Schema({
    title: String,
    description: String,
    lecture: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    comments: [commentSchema]
});

const reviewSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        public_id: {
            type: String,
            //required: true
        },
        secure_url: {
            type: String,
            //required: true
        }
    },
    lectures: [lectureSchema],
    numberOfLectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
    },
    reviews: [reviewSchema]
}, { timestamps: true });

export const Course = model('Course', courseSchema);
