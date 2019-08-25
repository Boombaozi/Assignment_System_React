
// 相当于是store对外提供的接口
//
export const setadmintoken = (Admin) => ({
  type: "setadmintoken",
  value:Admin
});
export const setstudenttoken = (Student) => ({
  type: "setstudenttoken",
  value:Student
});
export const setteachertoken = (Teacher) => ({
  type: "setteachertoken",
  value:Teacher
});

