import React, { Component } from 'react';
import UserTable from './components/UserTable';
//获取后台数据
import axios from 'axios';
import { Message } from '@alifd/next';

export default class test extends Component {

  constructor(props) {
    super(props);
    this.state={
      student:[],
    }

    this.getStudentList();
  }

  getStudentList(){
    axios.get('http://127.0.0.1/api/student/list?pageNum=1&pageSize=30')
      .then((response) => {
        console.log(response.data);
        const my=response.data.data;

        this.setState({
          student: my
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteStudent(id){
    axios.delete('http://127.0.0.1/api/student?id='+id)
      .then((response) => {
        Message.success("删除成功");
        console.log(response.data);
        this.getStudentList();
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
          delete={(id)=> this.deleteStudent(id) }
          studentList={this.state.student}  />
      </div>
    );
  }




}
