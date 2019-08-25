import React, { Component } from 'react';

import axios from 'axios';
import { Message, Form, Button, Input, Select, Radio, Checkbox, DatePicker, Switch, Upload } from '@alifd/next';
import store from '../../store';
import IceContainer from '@icedesign/container';


function gettime(time){
  console.log("毫秒数:"+time);
  console.log("转换后:");

  let time2= new Date(time);
  console.log(  time2.getFullYear() + '年 ' +
    (time2.getMonth()+1) + '月' +
    time2.getDate() + '日' +
    time2.getTime())

  return (
    time2.getFullYear() + '年 ' +
    (time2.getMonth() + 1) + '月' +
    time2.getDate() + '日' +
    time2.getHours() + '点:' + time2.getMinutes()+'分'
  );
};

function  gettime2(time) {
  let time2= new Date(time);
console.log(time2.getMonth())

  console.log(time2.getDay())
  return ( time2.toLocaleString());
}

export default class test3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };

   this.getdata();
  }

 getdata=()=>{
   axios({
     method: 'get',
     url: 'http://127.0.0.1/api/assignment/done/'+'C1',
     // params: this.state.student,
   })
     .then((response) => {
       console.log(response.data);
       const my = response.data.data;

       this.setState({
         data: my[0],
       });
     })
     .catch(function (error) {
       console.log(error);
     });
 }

  render() {

    return (
      <div>
        <IceContainer title={"时间显示测试"}>
          {gettime(this.state.data.starttime)}
          {gettime(this.state.data.endtime)}
          <IceContainer title={"区块测试"}>
          </IceContainer>
          <IceContainer title={"区块测试2"}>
          </IceContainer>
        </IceContainer>
      </div>
    );
  }
}
