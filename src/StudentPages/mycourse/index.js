import React, { Component } from 'react';
import ServiceCard from './components/ServiceCard';
import axios from 'axios/index';
import store  from '../../store'

export default class StudentCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course:[],
      store:store.getState(),
    };

    this.getCourseList=this.getCourseList.bind(this);
    this.getCourseList();
  }


  getCourseList() {
    if(this.state.store.userType!=("student")){
      console.log("未登录");
    }else {
      console.log("已登录");
    }
      axios({
        method: 'get',
        url: 'http://127.0.0.1/api/course/list2/'+this.state.store.student.studentClass,
        // params: this.state.student,
      })
        .then((response) => {
          console.log(response.data);
          const my = response.data.data;

          this.setState({
            course: my,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    return (
      <div className="page3-page">
        {/* 适用于展示服务类型的卡片 */}
        <ServiceCard course={this.state.course} />
      </div>
    );
  }
}
