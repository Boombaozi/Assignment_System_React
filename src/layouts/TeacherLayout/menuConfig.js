// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'email',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'help',
  },
];

const asideMenuConfig = [
  // {
  //   name: '我的主页',
  //   path: '/teacher/monitor',
  //   icon: 'home',
  // },
  {
    name: '我的课程',
    path: '/teacher/course',
    icon: 'calendar',
  },
  // {
  //   name: '发布作业',
  //   path: '/teacher/course/alist',
  //   icon: 'calendar',
  // },
];

export { headerMenuConfig, asideMenuConfig };
