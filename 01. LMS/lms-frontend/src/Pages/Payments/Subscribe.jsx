import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/PaymentSlice';
import HomeLayout from '../../Layouts/HomeLayout';
import { BiRupee } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserData } from '../../Redux/Slices/AuthSlice';

const Subscribe = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth);
    const pay = "payment"
    const navigater = useNavigate();
    
    const handleSubscribe = async (event) => {
        event.preventDefault();
        if (userId) {
            try {
                const purchaseResult = await dispatch(purchaseCourseBundle(pay));
                if (purchaseResult) {
                    const res = await dispatch(verifyUserPayment());
                    await dispatch(getUserData())
                    res?.payload?.success ? navigater("/checkout/success") : navigater("/checkout/fail")
                } else {
                    toast.error("Purchase failed.");
                }
            } catch (error) {
                toast.error("An error occurred during purchase:", error);
            }
        } else {
            toast.error("Please login to Subscribe");
        }
    };
    
    return (
        <div className='bg-base-100'>
            <HomeLayout>
                <form
                    onSubmit={handleSubscribe}
                    className="min-h-[90vh] flex items-center justify-center text-white"
                >
                    <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                        <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription Bundle</h1>
                        <div className="px-4 space-y-5 text-center">
                            <p className="text-[17px]">
                                This purchase will allow you to access all available courses on our platform for{" "}
                                <span className="text-yellow-500 font-bold">
                                    <br />
                                    1 Year duration
                                </span>{" "}
                                All the existing and newly launched courses will also be available.
                            </p>

                            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                                <BiRupee /><span>499</span> only
                            </p>
                            <div className="text-gray-200">
                                <p>100% refund on cancellation</p>
                                <p>* Terms and conditions applied *</p>
                            </div>
                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                                Buy now
                            </button>
                        </div>
                    </div>
                </form>
            </HomeLayout>
        </div>
    );
};

export default Subscribe;
