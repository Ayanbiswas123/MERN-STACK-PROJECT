import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import HomeLayout from '../../Layouts/HomeLayout';

function AllReviews() {
    const [reviews, setReviews] = useState([]);

    async function fetchReviews() {
        try {
            const response = await axiosInstance.get(`/allcontacts`);
            console.log(response.data.reviews);

            if (Array.isArray(response.data.reviews)) {
                setReviews(response.data.reviews);
                toast.success("Reviews loaded successfully");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            toast.error("Failed to load reviews");
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <HomeLayout>
            <div className="w-auto min-h-[90vh] overflow-hidden bg-base-100 pl-[60px] pr-[60px] ">
                <h1 className="text-2xl font-bold my-4 text-center text-white">All Reviews</h1>
                <div>
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviews.map(review => (
                                <div key={review._id} className="flex flex-col items-start w-[400px] h-[200px] border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
                                    <p className="text-lg font-semibold text-gray-900">{review.email}</p>
                                    <p className="text-gray-700 mt-2">{review.userMessage}</p>
                                    <p className="text-gray-500 mt-4">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews available</p>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AllReviews;
