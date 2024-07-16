import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { changePassword, forgotPassword, getUserData } from '../../Redux/Slices/AuthSlice';

function ForgotPassword() {
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        newPassword: "",
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        //console.log(data);
        if(!data.email || !data.newPassword) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.newPassword.length < 5) {
            toast.error("Password cannot be of less than 5 characters");
            return;
        }
        
        
        await dispatch(forgotPassword(data));

        navigate("/login");
    }

  return (
    <HomeLayout>
        <div className="bg-base-100 flex items-center justify-center h-[100vh] ">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">Forgot Password</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="text-lg font-semibold">Email ID</label>
                        <input 
                            required
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter your Email"
                            className="bg-transparent px-2 py-1 border"
                            value={data.email}
                            onChange={handleInputChange}
                        
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="text-lg font-semibold">New password</label>
                        <input 
                            required
                            type="text"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password"
                            className="bg-transparent px-2 py-1 border"
                            value={data.newPassword}
                            onChange={handleInputChange}
                        
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Reset Password
                    </button>


                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
    </HomeLayout>
   
  )
}

export default ForgotPassword;