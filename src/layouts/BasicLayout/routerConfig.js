// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from '../../UserLogin';
import Dashboard from '../../pages/Dashboard';
import test from '../../pages/test';
import AddStudent from '../../pages/AddStudent';
import EditStudent from '../../pages/EditStudent';
import CourseList from '../../pages/CourseList';
import AddCourse from '../../pages/AddCourse';
import EditCourse from '../../pages/EditStudent';
import teacherList from '../../pages/TeacherList';
import AddTeacher from '../../pages/AddTeacher/AddStudent';
import EditTeacher from '../../pages/EditTeacher';

const routerConfig = [
  {
    path: '/login',
    component: UserLogin,
  },
  {
    path: '/admin/dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/student/add',
    component: AddStudent,
  },
  {
    path: '/admin/student/edit',
    component: EditStudent,
  },
  {
    path: '/admin/teacher/edit',
    component: EditTeacher,
  },
  {
    path: '/admin/student/list',
    component: test,
  },
  {
    path: '/admin/teacher/list',
    component: teacherList,
  },
  {
    path: '/admin/course/list',
    component: CourseList,
  },
  {
    path: '/admin/course/add',
    component: AddCourse,
  },
  {
    path: '/admin/teacher/add',
    component: AddTeacher,
  },
];

export default routerConfig;
