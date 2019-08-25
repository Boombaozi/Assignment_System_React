import React, { Component } from 'react';
import SortCardList from './components/SortCardList';
import axios from 'axios';
import store from '../../store'

export default class StudentAlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aList1:[],
      aList2:[],
      store:store.getState()
    };

 this.getAssignmentList1();
 // this.getAssignmentList2();
  }

  getAssignmentList1() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/assignment/detail',
      params: {
        no:this.props.location.state.c_no,
        id:this.state.store.student.id
      },
    })
      .then((response) => {
        console.log(response.data);
        const my = response.data.data;

        this.setState({
          aList1: my,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAssignmentList2() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/assignment/done/'+this.props.location.state.c_no,
      // params: this.state.student,
    })
      .then((response) => {
        console.log(response.data);
        const my = response.data.data;

        this.setState({
          aList2: my,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    console.log("传入的数据为");
    console.log(this.props.location.state);
    console.log('新渲染的数据为');
    // console.log(this.props.location.state);
    console.log(this.state);

    return (
      <div className="page5-page">
        {/* 拖拽排序卡片列表 */}
        <SortCardList course={this.props.location.state}
                      aList1={this.state.aList1}
                      aList2={this.state.aList2}
        />
      </div>
    );
  }
}
