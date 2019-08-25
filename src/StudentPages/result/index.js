import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store/index';
import { Button, Input, Message, Radio, Form, Grid, Checkbox, DatePicker, Upload, Rating, Collapse } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter, Link } from 'react-router-dom';
import Img from '@icedesign/img';


const { Row, Col } = Grid;
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const url = 'http://127.0.0.1/api/file?name=';
const url2 = 'http://127.0.0.1/api/file/download?name=';


//上一个页面传入的数据格式
// a_className: "计1601"
// a_courseNo: "C1"
// a_endtime: 1557072000000
// a_id: 145
// a_name: "第一次作业"
// a_questionList: "[53,238,239,240,245]"
// a_starttime: 1556985600000
// a_status: "1"
// as_assignmentId: 145
// as_grade: 8
// as_id: 3310
// as_ischeck: "2"
// as_studentId: 1


//获得的题目信息及答案格式
// answer: "19e409ad075051668bc0fb4d80498db2.jpg"
// answerType: "1"
// assignmentId: 145
// choice: null
// content: "课后第一题5"
// correctChoice: null
// createTime: 1558088512000
// grade: 5
// id: 86
// q_answer: "19e409ad075051668bc0fb4d80498db2.jpg"
// q_id: 86
// questionId: 245
// questionType: "课后题"
// status: "1"
// studentId: 1
// subjectType: null
// subjectType2: null
// teacherComment: "好"

@withRouter
export default class result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionAndRecord: [],
      store: store.getState(),
    };

    this.getQuestionList();

  }

  componentWillMount() {
    console.log('组件装载完毕');
    console.log('传入的参数为', this.props.location.state);

  }


  getQuestionList = () => {


    console.log('请求后端数据');

    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/assignment/questionlist?sid=' +
        this.props.location.state.as_studentId + '&aid=' +
        this.props.location.state.as_assignmentId,
      // params: this.state.student,
    })
      .then((response) => {
        console.log(response.data);
        const my = response.data.data;
        console.log('后端数据请求成功');
        this.setState({
          questionAndRecord: this.state.questionAndRecord.concat(my),
        });
      })
      .catch(function (error) {
        console.log('后端数据请求失败');
        console.log(error);
        Message.error('网络错误');
      });
  };


  render() {
    if (this.state.questionAndRecord.length < 1) {
      return (

        <div>
          <IceContainer title={'批改结果'}>
            <table>
              <tr>
                <th>题目</th>
                <th>内容</th>
                <th>答案类型</th>
                <th>答案</th>
                <th>教师批注</th>
                <th>得分</th>
              </tr>
              无数据
            </table>
          </IceContainer>
        </div>

      );
    }
    console.log('页面重新渲染：', this.state);

    //答案解析，0为空 1为选择题，2为文本，3为图片，4为文件
    const answer = (answerType, answer) => {
      if (answerType === '1') {
        return (
          <h1>暂不支持选择题</h1>
        );
      } else if (answerType === '2') {
        return (
          <p>{answer}</p>
        );
      } else if (answerType === '3') {
        return (
          <Img
            style={{
              verticalAlign: 'middle',
            }}
            width={400}
            height={200}
            type="contain"
            src={(url + answer)}
          />
        );
      } else if (answerType === '4') {
        return (
          <a href={(url2 + answer)}> 文件下载链接</a>
        );
      } else {
        return (<h1>空</h1>);
      }
    };

    //答案解析，0为空 1为选择题，2为文本，3为图片，4为文件
    const answer2 = (answerType, answer) => {
      if (answerType === '1') {
        return (
          <h1>暂不支持选择题</h1>
        );
      } else if (answerType === '2') {
        return (
          <p>{answer}</p>
        );
      } else if (answerType === '3') {
        return (
          <Img
            style={{
              verticalAlign: 'middle',
            }}
            width={400}
            height={200}
            type="contain"
            src={(url + answer)}
          />
        );
      } else if (answerType === '4') {
        return (
          <a href={(url2 + answer)}> 批改文件下载链接</a>
        );
      } else {
        return (<h1>空</h1>);
      }
    };

    // 答案类型解析
    const answerType = (answerType) => {
      if (answerType === '1') {
        return (
          '选择题'
        );
      } else if (answerType === '2') {
        return (
          '文本'
        );
      } else if (answerType === '3') {
        return (
          '图片'
        );
      } else if (answerType === '4') {
        return (
          '文件'
        );
      }
    };

    {/*<tr key={index}>*/
    }
    {/*  <td>第{(index + 1)}题</td>*/
    }
    {/*  <td>{item.content} </td>*/
    }
    {/*  <td>{answerType(item.answerType)}</td>*/
    }
    {/*  <td>{answer(item.answerType, item.answer)}</td>*/
    }
    {/*  <td>{answer(item.teacherCommentType, item.teacherComment2)}</td>*/
    }
    {/*  <td>*/
    }
    {/*    {item.teacherComment}*/
    }
    {/*  </td>*/
    }
    {/*  <td>*/
    }
    {/*    <Rating*/
    }
    {/*      value={item.grade}*/
    }
    {/*      size="small"*/
    }
    {/*      count={5}*/
    }
    {/*      showGrade*/
    }
    {/*      disabled*/
    }
    {/*      allowHalf*/
    }
    {/*    />*/
    }
    {/*    {item.grade}分*/
    }
    {/*  </td>*/
    }
    {/*</tr>*/
    }
    //列表显示
    const list = this.state.questionAndRecord.map((item, index) => {
      return (


        <Panel key={index}
               title={'第' + (index + 1) + '题:' + item.content + '(答案类型:' + answerType(item.answerType) + '              得分:' + item.grade + '分)'}>
          <IceContainer >
            <Rating
              value={item.grade}
              size="small"
              count={5}
              showGrade
              disabled
              allowHalf
            />
            {item.grade}分
          </IceContainer>
          <Row>
            <IceContainer title={'我的答案'}>{answer(item.answerType, item.answer)}</IceContainer>
            <IceContainer title={'批注'}>{answer2(item.teacherCommentType, item.teacherComment2)}</IceContainer>
            <IceContainer title={'文字批注'}>{item.teacherComment}</IceContainer>
          </Row>


        </Panel>

      );
    });


    return (


      <div>
        <IceContainer title={'批改结果'}>
          {/*<table>*/}
          {/*  <tr>*/}
          {/*    <th>题目</th>*/}
          {/*    <th>内容</th>*/}
          {/*    <th>答案类型</th>*/}
          {/*    <th>答案</th>*/}
          {/*    <th>教师批注</th>*/}
          {/*    <th>文字批注</th>*/}
          {/*    <th>得分</th>*/}
          {/*  </tr>*/}
          <Collapse rtl='ltr'>
            {list}
          </Collapse>
          {/*</table>*/}
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
