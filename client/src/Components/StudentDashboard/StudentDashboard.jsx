import React, { useEffect } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../../redux/reducer/formReducer";
import { useNavigate } from "react-router-dom";
import { courseSelector, getAllCourse, getCourse } from "../../redux/reducer/studentReducer";

export default function StudentDashboard() {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
    const {courseData, AllCourseData, status, error} = useSelector(courseSelector);

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getCourse())
        dispatch(getAllCourse())
    },[dispatch, courseData])

    const navigate = useNavigate();

    const manageCourse = (value) => {
        navigate(`/student/view-course/${value}`);
    }

    return (
        <>
            <DashboardNavbar user="student" />
            <div className="dashboard">
                <div className="dashboard-content">
                    <p className="welcomeback">
                        Welcome back, {userData?.name}!
                    </p>
                    <p className="courses-head">Courses</p>
                    <div className="courses">
                        {AllCourseData?.length ? (
                            AllCourseData.map((item, index) => (
                                <div className="course" key={index}>
                                    <div className="course-card">
                                        <img src={item.courseThumbnail} alt={item.title} onClick={() => manageCourse(item._id)} />
                                    </div>
                                    <p className="course-name" onClick={() => manageCourse(item._id)}>
                                        {item.title}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No courses available</p>
                        )}
                    </div>
                    <p className="courses-head">My Courses</p>
                    <div className="courses">
                        <div className="course">
                            <div className="course-card">
                                <img src={thumbnail} alt="" />
                            </div>
                            <p className="course-name">Zidio UI/UX Training Session</p>
                            <div className="bar">
                                <div className="completed">
                                    <div className="progress" style={{ width: '75%' }}></div>
                                </div>
                                <p className="percentage">75%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
