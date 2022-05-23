import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from '@/pages/Login' 
import React from 'react'
import { AuthComponent } from './components/AuthComponent'
import StuLayout from './pages/Layout/student'
import GeekLayout from './pages/Layout/admin'
import TeaLayout from './pages/Layout/teacher'
import StudentManage from './pages/Layout/admin/studentManage'
import TeacherManage from './pages/Layout/admin/teacherManage'
import ClassManage from './pages/Layout/admin/classManage'
import Register from './pages/Register'
import Exam from './pages/Layout/student/exam'
import Score from './pages/Layout/student/score'
import Message from './pages/Layout/student/message'
import DataShow from './pages/Layout/teacher/dataShow'
import StudentManageByTea from './pages/Layout/teacher/studentManage'
import ExamManage from './pages/Layout/teacher/examManage'
import QuestinManage from './pages/Layout/teacher/questionManage'
import FillQuestionManage from './pages/Layout/teacher/questionManage/fillQuestionManage'
import JudgeQiestionManage from './pages/Layout/teacher/questionManage/judgeQuestionManage'
import ScoerShow from './pages/Layout/teacher/scoreShow'
import Examing from './pages/Layout/student/exam/examing'
import ScoreAfterExam from './pages/Layout/student/exam/scoreAfterExam'
//antd
// import { Button } from 'antd';

export default function App (){
    
        return(
            <BrowserRouter>
                
                <div className="App">
                    <Routes>

                        {/**管理员模块 */}
                        <Route path='/admins' element={
                        <AuthComponent>
                        <GeekLayout />
                        </AuthComponent>
                        }>
                            <Route index element={<StudentManage/>}></Route>
                            <Route path='teacherManage' element={<TeacherManage/>}></Route>
                            <Route path='classManage' element={<ClassManage/>}></Route>    
                        </Route>

                        <Route path='/' element={<Login />}></Route>

                        <Route path='/login' element={<Login />}></Route>

                        <Route path='/register' element={<div><Register/></div>}></Route>
                        {/* //学生模块 */}
                        <Route path='/student' element={
                            <AuthComponent>
                                <StuLayout />
                            </AuthComponent>}>
                            <Route index element={<Exam/>}></Route>
                            <Route path='score' element={<Score/>}></Route>
                            <Route path='message' element={<Message />}></Route>
                        </Route>
                            {/* 学生考试模块路由 */}
                        <Route path='/examing' element={<Examing/>}></Route>
                        <Route path='/scoreAfterExam' element={<ScoreAfterExam/>}></Route>
                            {/**教师模块路由 */}
                        <Route path='/teacher' element={
                        <AuthComponent>
                            <TeaLayout />
                        </AuthComponent>}>

                            <Route index element={<DataShow/>}></Route>
                            <Route path='studentManage' element={<StudentManageByTea/>}></Route>
                            <Route path='examManage' element={<ExamManage/>}></Route>
                            <Route path='questionManage' element={<QuestinManage/>}></Route>
                            <Route path='fillQuestionManage' element={<FillQuestionManage/>}></Route>
                            <Route path='judgeQuestionManage' element={<JudgeQiestionManage/>}></Route>
                            <Route path='scoreShow' element={<ScoerShow/>}></Route>
                        </Route>

                    </Routes>
                </div>
            </BrowserRouter>         
        )
    
}
 