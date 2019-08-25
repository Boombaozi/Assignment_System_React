import React, { Component } from 'react';
import UserTable from './components/UserTable';
//获取后台数据
import axios from 'axios';
import { Message } from '@alifd/next';

export default class teacherList extends Component {

  constructor(props) {
    super(props);
    this.state={
      teacher:[],
    }

    this.getTeacherList();
  }

  getTeacherList(){
    axios.get('http://127.0.0.1/api/teacher/list')
      .then((response) => {
        console.log(response.data);
        const my=response.data.data;

        this.setState({
          teacher: my
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteTeacher(id){
    axios.delete('http://127.0.0.1/api/teacher?id='+id)
      .then((response) => {
        Message.success("删除成功");
        console.log(response.data);
        this.getTeacherList();
      })
      .catch(function (error) {
        Message.error("删除失败");
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        <UserTable
          delete={(id)=> this.deleteTeacher(id) }
          TeacherList={this.state.teacher}  />
      </div>
    );
  }




}
