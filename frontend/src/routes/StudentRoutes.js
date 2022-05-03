import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import {Home, Courses, Application,Exam,  Profile, Apply} from '../components/Pages';
import ThankYou from '../components/UIs/ThankyouPage'
const StudentRoutes = () => {
 return (
   <Routes>
            <Route exact path="/student/apply" element={<Apply/>} />
            <Route exact path="/student/profile" element={<Profile/>} />
            <Route exact path="/student/exams" element={<Exam/>} />
            <Route exact path="/student/applications" element={<Application/>} />
            <Route exact path="/student/courses" element={<Courses/>} />
            <Route exact path="/student/thankyou" element={<ThankYou/>} />
            <Route exact path="/" 
              element={<Home/>}
            />
            <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          </Routes>
 );
};

export default StudentRoutes;