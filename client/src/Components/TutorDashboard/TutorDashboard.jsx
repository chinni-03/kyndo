import React, { useEffect } from "react";
import DashboardNavbar from "../DashboardNavbar";
import thumbnail from '../../assets/thumbnail.png';
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../../redux/reducer/formReducer";
import { courseSelector, getAllCourse, getCourse } from "../../redux/reducer/tutorReducer";

export default function TutorDashboard() {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
    const {courseData,AllCourseData, status, error} = useSelector(courseSelector);

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getCourse())
        dispatch(getAllCourse())
    },[dispatch, courseData,AllCourseData])

    const navigate = useNavigate();

    const manageCourse = (value) => {
        const idExists = courseData.some(item => item._id === value);
        if (idExists) {
            navigate(`/tutor/manage-course/${value}`);
        } else {
            navigate(`/tutor/view-course/${value}`);
        }
    }

    const addCourse = () => {
        navigate(`/tutor/upload-course/${userData?._id}`);
    }

    return (
        <>
        <DashboardNavbar user="tutor" />
        <div className="dashboard">
            <div className="dashboard-content">
                <p className="welcomeback">
                    Welcome back, {userData?.name}!
                </p>
                <p className="courses-head">Uploaded Courses</p>
                <div className="courses">
                    {/* courses */}
                    {courseData?.map((item, index)=>(
                        <div className="course" key={index}>
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={item.courseThumbnail} alt={item.title}
                                data-course="Zidio UI/UX Training Session"
                                onClick={() => manageCourse(item._id)} />
                        </div>
                        {/* course-name */}
                        <p className="course-name"
                            data-course="Zidio UI/UX Training Session"
                            onClick={() => manageCourse(item._id)} >
                                {item.title}
                        </p>
                    </div>
                    ))}
                </div>
                <div className="courses-head-div">
                    <p className="courses-head">All Courses</p>
                    <button className="signout" onClick={addCourse}>Add Course</button>
                </div>
                <div className="courses">
                    {/* courses */}
                    {AllCourseData?.map((item,index)=>(
                        <div className="course" key={index}>
                        <div className="course-card">
                            {/* thumbnail */}
                            <img src={item.courseThumbnail} alt={item.title}
                                data-course="Zidio UI/UX Training Session"
                                onClick={(e) => manageCourse(item._id)} />
                        </div>
                        {/* course-name */}
                        <p className="course-name"
                            data-course="Zidio UI/UX Training Session"
                            onClick={(e) => manageCourse(item._id)} >
                                {item.title}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}