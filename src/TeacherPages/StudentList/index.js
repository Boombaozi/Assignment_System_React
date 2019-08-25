import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store/index';
import { Button, Input, Message, Radio, Form, Grid, Checkbox, DatePicker, Upload, Rating, Progress } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter, Link } from 'react-router-dom';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};


@withRouter
export default class studentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      //登录用户信息
      store: store.getState(),
    };

    this.getData = this.getData.bind(this);
    this.getData();
  }

  handleClick(item) {
    if(item.a_ischeck==='0') {
      Message.error("学生未提交作业，无法批改")
    }else {
      this.props.history.push({ pathname: '/teacher/course/assignment/comment', state: item });
    }
  }

  getData() {
    console.log('传入的参数为', this.props.location.state);

    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/assignment/studentlist?id=' + this.props.location.state.id,
    })
      .then((response) => {
        console.log(response.data);
        Message.success('数据获取成功');

        console.log(response.data);
        const my = response.data.data;

        this.setState({
          list: my,
        });
      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
      });
  }


  // private Long s_id;
  // private String s_no;
  // private String s_name;
  // private String s_password;
  // private String s_grade;
  // private String s_college;
  // private String s_studentclass;
  // private String s_major;
  // private String s_image;
  // private String s_email;
  // private String s_status;
  // private Long a_id;
  // private Long a_studentid;
  // private Long a_assignmentid;
  // private String a_ischeck;
  // private Integer a_grade;


  fen = (list) => {

    console.log('数据为', list);
    //分数累加
    let fen = 0;
    //总人数
    let count = list.length;
    //提交人数
    let submit = 0;
    //未提交人数
    let unsubmit = 0;
    //已批改人数
    let comment =0;
    //未批改人数
    let uncomment=0;
    for (let i = 0; i < list.length; i++) {
      fen += list[i].a_grade;
      if (list[i].a_ischeck === '1'||list[i].a_ischeck === '2') {
        submit++;
      }
      if (list[i].a_ischeck === '0') {
        unsubmit++;
      }
      if (list[i].a_ischeck === '2') {
        comment++;
      }
      if (list[i].a_ischeck === '1') {
        uncomment++;
      }
    }
    console.log('总分为：', fen);
    let submit2=(submit/count)*100;
    let comment2=(comment/submit)*100;

    fen=fen/comment;

    if(count===0){
      submit2=0;
    }
    if(submit===0){
      comment2=100;
      fen=0;
    }
    if(comment===0){
      fen=0;
    }

    return {
      count:count,
      fen:fen ,
      submit: submit,
      unsubmit: unsubmit,
      comment: comment,
      uncomment: uncomment,
      submit2: submit2,
      comment2:comment2
    };
  };




  render() {

    if (this.state.list.length < 1) {
      return (
        <h1>数据为空</h1>
      );
    }

    //已批改作业平均分
    let data = this.fen(this.state.list);
    let count=data.count;
    let fen=data.fen;
    console.log("数据统计",data);
    //提交/未提交 人数
    let submit = data.submit;
    let notsubmit = data.unsubmit;
    //提交百分比
    let submit2 = data.submit2;

    //批改/未批改人数
    let comment = data.comment;
    let notcomment = data.uncomment;

    //批改百分比
    let comment2 = data.comment2;


    const list = this.state.list.map((item, index) => {

      const ischeck = (ischeck) => {

        if (ischeck === '0') {
          return '未完成';
        } else if (ischeck === '1') {
          return '已提交答案';
        } else {
          return '已阅';
        }
      };

      return (
        <tr key={index}>
          <td>{item.s_no} </td>
          <td>{item.s_name} </td>
          <td>{item.s_studentclass}</td>
          <td>{ischeck(item.a_ischeck)}</td>
          <td>{item.a_grade}</td>
          <td><a onClick={() => this.handleClick(item)}> 批改</a></td>
        </tr>

        // <div>
        //   <table >
        //     <tr>
        //       <th>姓名</th>
        //       <th>班级</th>
        //       <th>作业情况</th>
        //       <th>得分</th>
        //     </tr>
        //     <tr key={index}>
        //       <td>{item.s_name} </td>
        //       <td>{item.s_studentclass}</td>
        //       <td>{ischeck(item.a_ischeck)}</td>
        //       <td>0</td>
        //       <td><a href={"/"}> 批改</a> </td>
        //     </tr>
        //   </table>
        // </div>


      );
    });

    return (


      <div>
        <h1>{this.props.location.state.courseNo}</h1>
        <h1>{this.props.location.state.name}</h1>

        <IceContainer  title={'作业信息统计'}>
          <h5>平均分：{fen}</h5>
          <Rating value={fen}
                  size="small"
                  count={10}
                  showGrade
                  allowHalf
                  disabled
                  hasLimitHint
          />
        </IceContainer>
        <IceContainer>
          <h4>{this.props.location.state.className}总人数:{count}人</h4>
          <Row>
            <p>已提交：{submit}人     未提交：{notsubmit}人</p>
            <Progress percent={submit2} size="small" shape="circle"/> &nbsp;&nbsp;
            <p>已批改:{comment}人 待批改:{notcomment}人</p>
            <Progress percent={comment2} shape="circle" size="small" state="success"/>
          </Row>
        </IceContainer>
        <IceContainer>
          <table>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>班级</th>
              <th>作业情况</th>
              <th>得分</th>
            </tr>
            {list}
          </table>
        </IceContainer>
      </div>
    );


  }
}


const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};
