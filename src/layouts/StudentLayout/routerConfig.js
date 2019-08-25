
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import Guide from '../../components/Guide';
import StudentCourse from '../../StudentPages/mycourse'
import StudentAlist from '../../StudentPages/alist'
import qlist from '../../StudentPages/questionList'
import test from '../../StudentPages/test'
import test2 from '../../StudentPages/test2';
import test3 from '../../StudentPages/test3';
import result from '../../StudentPages/result';

const routerConfig = [
  {
    path: '/student/course/alist',
    component: StudentAlist,
  },
  {
    path: '/student/course/result',
    component: result,
  },
  {
    path: '/student/test',
    component: test,
  },
  {
    path: '/student/test2',
    component: test2,
  },
  {
    path: '/student/test3',
    component: test3,
  },
  {
    path: '/student/course/qlist',
    component: qlist,
  },
  {
    path: '/student/monitor',
    component: Guide,
  },
  {
    path: '/student/course',
    component: StudentCourse,
  },



];

export default routerConfig;
