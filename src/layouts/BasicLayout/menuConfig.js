// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: '/',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: '/',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  // {
  //   name: '我的工作台',
  //   path: '/admin/dashboard',
  //   icon: 'home',
  // },
  {
    name: '学生信息管理',
    path: '/admin/student/list',
    icon: 'yonghu',
  },
  {
    name: '教师信息管理',
    path: '/admin/teacher/list',
    icon: 'yonghu',
  },
  {
    name: '课程管理',
    path: '/admin/course/list',
    icon: 'directory',
  },
  {
    name: '添加学生',
    path: '/admin/student/add',
    icon: 'publish',
  },

  {
    name: '添加教师',
    path: '/admin/teacher/add',
    icon: 'publish',
  },

];

export { headerMenuConfig, asideMenuConfig };
