import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <HomeLayout>
      <div className='bg-base-100 min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white'>
        <div className='text-center text-2xl mb-6'>Admin Dashboard</div>
        <ul className='list-none flex flex-row gap-4'>
          <li>
            <Link to="/course/create" className='bg-slate-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Create New Course
            </Link>
          </li>
          <li>
            <Link to="/courses" className='bg-slate-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              All Courses
            </Link>
          </li>
          <li>
            <Link to="/contact-request" className='bg-slate-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              All Contact Requests
            </Link>
          </li>
          <li>
            <Link to="/growth" className='bg-slate-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Month wise growth
            </Link>
          </li>
          <li>
            <Link to="/" className='bg-slate-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Go back to Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
