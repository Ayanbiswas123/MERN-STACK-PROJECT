
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denide';
import CourseDescription from './Pages/Course/CourseDescription';
import CreateCourse from './Pages/Course/CreateCourse';
import RequireAuth from './Components/Auth/RequireAuth';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/Payments/Checkout';
import Subscribe from './Pages/Payments/Subscribe';
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess';
import CheckoutFailure from './Pages/Payments/CheckoutFailure';
import DisplayLecture from './Pages/Dashboard/DisplayLecture';
import AddLecture from './Pages/Dashboard/Addlecture';
import UpdateCourse from './Pages/Course/UpdateCourse';
import CodeEditor from './CodeOnline/components/CodeEditor'
import { Box } from '@chakra-ui/react';
import SubmitReview from './Pages/Revievs/SubmitReview';
import AllReviews from './Pages/Revievs/AllReviews';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/code-online" element={<CodeEditor />}/>


        <Route path="/courses" element={<CourseList />} />
        <Route path="/addreview" element={<SubmitReview/>} />
        <Route path="/allreview" element={<AllReviews/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/denied" element={<Denied />} />


        <Route path="/course/description" element={<CourseDescription />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/course/update' element={<UpdateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/editprofile' element={<EditProfile />} />
          <Route path='/checkout' element={<Subscribe />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />
          <Route path='/course/displaylectures' element={<DisplayLecture />} />
          <Route path='/course/addlecture' element={<AddLecture />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;