/**
 * 定义应用路由
 */
import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';


const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/admin" component={BasicLayout} />
        <Route path="/teacher" component={TeacherLayout} />
        <Route path="/student" component={StudentLayout} />
        <Route path="/login" exact component={UserLayout} />

        {/*从根路径跳转到 /login*/}
        <Route path="/" exact component={UserLayout} />

      </Switch>
    </HashRouter>
  );
};

export default router();
