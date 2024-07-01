import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';
import HomeLayout from '../../Layouts/HomeLayout';

function SubmitReview() {
    const [userInput, setUserInput] = useState({
        message: "",
        rating: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        
        if (userInput.rating < 1 || userInput.rating > 5) {
            toast.error("Rating must be between 1 and 5");
            return;
        }

        try {
            const response = axiosInstance.post('/addreview', {
                message: userInput.message,
                rating: userInput.rating
            });

            toast.promise(response, {
                loading: "Submitting your review...",
                success: "Review submitted successfully",
                error: "Failed to submit the review"
            });

            const reviewResponse = await response;
            console.log(reviewResponse);

            if (reviewResponse?.data?.success) {
                setUserInput({
                    message: "",
                    rating: ""
                });
            }
        } catch (err) {
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            <div className="bg-base-100 flex items-center justify-center h-[90vh] ">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                    <h1 className="text-3xl font-semibold">
                        Submit Review
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="rating" className="text-xl font-semibold">
                            Rating
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="rating"
                            type="text"
                            name="rating"
                            min="1" 
                            max="5"
                            placeholder="Enter your rating (1-5)"
                            onChange={handleInputChange}
                            value={userInput.rating}
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default SubmitReview;
