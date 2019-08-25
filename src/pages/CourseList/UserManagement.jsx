import React, { Component } from 'react';
import UserTable from './components/UserTable';
//获取后台数据
import axios from 'axios';
import { Message } from '@alifd/next';
import CardList from './components/CardList';
import { withRouter, Link } from 'react-router-dom';

@ withRouter
export default class CourseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      course: [],
    };

    this.getCourseList();
  }

  getCourseList() {
    http://127.0.0.1/api/course/list?pageNum=1&pageSize=10
      axios({
        method: 'get',
        url: 'http://127.0.0.1/api/course/list',
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

  deleteCourse(no) {
    axios.delete('http://127.0.0.1/api/course?no='+no)
      .then((response) => {
        Message.success('删除成功');
        console.log(response.data);
        this.getCourseList();
      })
      .catch(function (error) {
        Message.error('删除失败');
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        <CardList
          delete={(no) => this.deleteCourse(no)}
          courseList={this.state.course}/>
      </div>
    );
  }


}
