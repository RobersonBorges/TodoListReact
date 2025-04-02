import {  Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home'
import Category from '../pages/category/Category';
import Task from '../pages/task/task';

 export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      <Route path="/task" element={<Task />} />
    </Routes>
   );
 }