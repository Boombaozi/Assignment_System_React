
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import Guide from '../../components/Guide';
import myCourse from '../../TeacherPages/mycourse';
import alist from '../../TeacherPages/alist';
import addAssign from '../../TeacherPages/addAssignment'
import studentList from '../../TeacherPages/StudentList';
import comment from '../../TeacherPages/comment';
import result from '../../StudentPages/result';
import alist2 from '../../TeacherPages/alist2';

const routerConfig = [
  {
    path: '/teacher/monitor',
    component: Guide,
  },

  {
    path: '/teacher/course/assignment/add',
    component: addAssign,
  },

  {
    path: '/teacher/course/assignment/student',
    component:   studentList,
  },
  {
    path: '/teacher/course/assignment/comment',
    component:   comment,
  },


  {
    path: '/teacher/course/alist',
    component: alist,
  },
  {
    path: '/teacher/course/alist2',
    component: alist2,
  },
  {
    path: '/teacher/course',
    component: myCourse,
  },



];

export default routerConfig;
