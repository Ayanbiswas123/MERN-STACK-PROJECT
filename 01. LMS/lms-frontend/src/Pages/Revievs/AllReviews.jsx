import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { FaStar, FaRegStar } from 'react-icons/fa';
import HomeLayout from '../../Layouts/HomeLayout';

function AllReviews() {
    const [reviews, setReviews] = useState([]);
    const [startLimit, setStartLimit] = useState(0);
    const [endLimit, setEndLimit] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);

    async function fetchReviews(startLimit,endLimit) {
        try {
            const response = await axiosInstance.get(`/allreview?startlimit=${startLimit}&endlimit=${endLimit}`);
            console.log(response.data.reviews);
                if(response.data.reviews.length === 0){
                    console.log("yes");
                    setNextPage(nextPage => (nextPage = 0))
                    setNextPage(nextPage => (nextPage = 0))
                    console.log(nextPage,"aaa");
                }else{
                    setNextPage(nextPage => (nextPage = 1))
                    console.log(nextPage,"bbb");
                }

            if (Array.isArray(response.data.reviews)) {
                setReviews(response.data.reviews);
                toast.success("Reviews loaded successfully");
                //console.log(response.data.reviews);
                
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            toast.error("Failed to load reviews");
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        fetchReviews(startLimit,endLimit);
    }, [startLimit,endLimit]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-400" />);
            }
        }
        return stars;
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
        setStartLimit(prevStartLimit => prevStartLimit + 6)
        setEndLimit(prevEndLimit => prevEndLimit + 6)
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
        setStartLimit(prevStartLimit => (prevStartLimit > 0 ? prevStartLimit - 6 : 0))
        setEndLimit(prevEndLimit => (prevEndLimit > 6 ? prevEndLimit - 6 : 6))
        //console.log(startLimit,endLimit);
    };

    return (
        <HomeLayout>
            <div className="w-auto min-h-[90vh] overflow-hidden bg-base-100 pl-[60px] pr-[60px] ">
                <h1 className="text-2xl font-bold my-4 text-center text-white">All Reviews</h1>
                <div>
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviews.map(review => (
                                <div key={review._id} className="flex items-center w-[400px] h-[200px] border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
                                    <div className="w-16 h-16 mr-4">
                                        <img className="rounded-full w-full h-full object-cover" src={review.userImageUrl} alt="User" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{review.userName}</h3>
                                        <div className="flex items-center mt-2">
                                            {renderStars(review.rating)}
                                        </div>
                                        <p className="text-gray-700 mt-2 overflow-hidden hover:overflow-y-scroll max-h-24">{review.userMessage}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews available</p>
                    )}

                </div>
                <div className="flex justify-between my-4">
                    <button
                        onClick={handlePrevPage}
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${nextPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={nextPage === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AllReviews;
