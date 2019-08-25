import axios from 'axios';


const defaultState = {
  student:{},
  admin:{},
  teacher:{},
  userType:'',
  token:''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case action.type = 'setadmintoken': {
      const newState = JSON.parse(JSON.stringify(state));
      newState.teacher={};
      newState.student={};
      newState.admin=action.value;
      newState.token=action.value.password;
      newState.userType='admin';
      return newState;
    }
    case action.type='setstudenttoken':{
      const newState = JSON.parse(JSON.stringify(state));
      newState.teacher={};
      newState.admin={};
      newState.student=action.value;
      newState.token=action.value.password;
      newState.userType='student';
      return newState;
    }
    case action.type='setteachertoken':{
      const newState = JSON.parse(JSON.stringify(state));
      newState.student={};
      newState.admin={};
      newState.teacher=action.value;
      newState.token=action.value.password;
      newState.userType='teacher';
      return newState;
    }
    default:
      return state;
  }
};
