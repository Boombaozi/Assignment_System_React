import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store/index';
import { Button, Input, Message, Radio, Form, Grid, Checkbox, DatePicker, Upload, Rating } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter, Link } from 'react-router-dom';
import Img from '@icedesign/img';
import IcePanel from '@icedesign/panel';


const { Row, Col } = Grid;
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const url = 'http://127.0.0.1/api/file?name=';
const url2 = 'http://127.0.0.1/api/file/download?name=';

//上一个页面传入的数据格式
// a_assignmentid: 139
// a_grade: 0
// a_id: 3128
// a_ischeck: "0"
// a_studentid: 23233265
// s_college: "计算机学院"
// s_email: null
// s_grade: "0"
// s_id: 3128
// s_image: null
// s_major: "计算机科学与技术"
// s_name: "柯敏"
// s_no: "201607070103"
// s_password: "EA48576F30BE1669971699C09AD05C94"
// s_status: "0"
// s_studentclass: "计1601"


//获得的题目信息及答案格式
// answer: "fcd13d56150a13747069881c94b82799.png"
// answerType: "3"
// assignmentId: 139
// choice: null
// content: "课后题3"
// correctChoice: null
// createTime: 1557891801000
// grade: null
// id: 79
// q_answer: "fcd13d56150a13747069881c94b82799.png"
// q_id: 79
// questionId: 230
// questionType: "课后题"
// status: "1"
// studentId: 1
// subjectType: null
// subjectType2: null
// teacherComment: null
function onDragOver() {
  console.log('dragover callback');
}

function onError(file) {
  Message.error('上传失败');
  console.log('onError callback : ', file);
}

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onRemove(info) {
  console.log('onRemove callback : ', info);
}

function onChange(info) {
  console.log('onChange callback : ', info);
}

function onSuccess(index, type, res, file) {
  Message.success('上传成功');
  console.log('onSuccess callback res : ', res);
  console.log('onSuccess callback file : ', file);
  console.log('onSuccess callback index : ', index);
  let assignmentRecord = this.state.assignmentRecord;
  assignmentRecord[index].teacherComment2 = file[0].response.name;
  assignmentRecord[index].teacherCommentType = type;

  this.setState({
    assignmentRecord: assignmentRecord,
  });

}

@withRouter
export default class comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //题目记录（提交到后端）
      assignmentRecord: [],
      //题目及答案列表
      questionAndRecord: [],
      //作业状态信息（提交到后端）
      assignmentStat: {
        id: this.props.location.state.a_id,
        assignmentId: this.props.location.state.a_assignmentid,
        grade: this.props.location.state.a_grade,
        ischeck: '2',
        studentId: this.props.location.state.a_studentid,
      },
      //登录用户信息
      store: store.getState(),
    };

    // this.getData = this.getData.bind(this);
    // this.getData();

    this.getQuestionList();

  }

  componentWillMount() {
    console.log('组件装载完毕');
    console.log('传入的参数为', this.props.location.state);

  }

  // getData() {
  //   console.log('传入的参数为', this.props.location.state);
  //
  //   axios({
  //     method: 'get',
  //     url: 'http://127.0.0.1/api/assignment?id=' + this.props.location.state.a_assignmentid,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       Message.success('数据获取成功');
  //
  //       console.log(response.data);
  //       const my = response.data.data;
  //       this.setState({
  //         questionIdList: JSON.parse(my.questionList),
  //
  //       });
  //
  //       this.getQuestionList();
  //     })
  //
  //     .catch(function (error) {
  //       Message.success('数据获取失败');
  //       console.log(error);
  //     });
  // }


  getQuestionList = () => {


    console.log('请求后端数据');

    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/assignment/questionlist?sid=' +
        this.state.assignmentStat.studentId + '&aid=' +
        this.state.assignmentStat.assignmentId,
      // params: this.state.student,
    })
      .then((response) => {
        console.log(response.data);
        const my = response.data.data;
        console.log('后端数据请求成功');
        this.setState({
          questionAndRecord: this.state.questionAndRecord.concat(my),
        });

        //填入要提交的数据
        this.state.questionAndRecord.map((item, index) => {
          console.log('添加记录数据');
          this.setState({
            assignmentRecord: this.state.assignmentRecord.concat({
              id: item.id,
              studentId: item.studentId,
              questionId: item.questionId,
              assignmentId: item.assignmentId,
              answerType: item.answerType,
              answer: item.answer,
              grade: item.grade,
              teacherComment: item.teacherComment,
              teacherComment2:item.teacherComment2,
              teacherCommentType:item.teacherCommentType,

            }),
          });

        });

      })
      .catch(function (error) {
        console.log('后端数据请求失败');
        console.log(error);
        Message.error('网络错误');
      });
  };


  buttonClick = () => {
    console.log('点击了按钮');

    this.state.assignmentRecord.map((item, index) => {
      axios({
        method: 'put',
        url: 'http://127.0.0.1/api/assignment/record',
        params: item,
      })
        .then((response) => {
          console.log(response.data);
          Message.success('提交成功');
        })
        .catch(function (error) {
          Message.success('提交失败。请重试');
          console.log(error);
        });

    });

    axios({
      method: 'put',
      url: 'http://127.0.0.1/api/assignment/state',
      params: this.state.assignmentStat,
    })
      .then((response) => {
        console.log(response.data);
        Message.success('提交成功');
      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
      });

    this.props.history.push({ pathname: '/teacher/course/assignment/comment', state: this.props.location.state });
  };

  ratingChange = (index, val) => {
    console.log('评分发生了改变', index, val);
    const change = this.state.assignmentRecord[index];
    change.grade = val;

    let data = this.state.assignmentRecord;

    data[index] = change;

    this.setState({
      assignmentRecord: data,
    });

    const fen = this.jisuanzongfen(this.state.assignmentRecord);
    let assignmentStat2 = this.state.assignmentStat;
    assignmentStat2.grade = fen;

    this.setState({
      assignmentStat: assignmentStat2,
    });


  };


  ratingChange2 = (val) => {
    console.log('总评分发生了改变', val);

    let assignmentStat2 = this.state.assignmentStat;
    assignmentStat2.grade = val;
    this.setState({
      assignmentStat: assignmentStat2,
    });
  };

  inputChange = (index, value) => {

    console.log('输入框发生了改变', index, value);
    const change = this.state.assignmentRecord[index];
    change.teacherComment = value;


    let data = this.state.assignmentRecord;

    data[index] = change;

    this.setState({
      assignmentRecord: data,
    });


  };

  jisuanzongfen = (val) => {

    console.log('计算总分', val);
    if (val.length === 0) {
      console.log('数据未定义');
    }
    let count = 0;
    for (let i = 0; i < val.length; i++) {
      count = count + val[i].grade;

    }

    console.log('计算总分', (count / val.length) * 2);
    return (count / val.length) * 2;

  };

  render() {

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
          <a href={(url2 + answer)}> 下载链接</a>
        );
      }else {
        return(  <h1>空</h1>);
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

    const list = this.state.questionAndRecord.map((item, index) => {

      return (
        <tr key={index}>
          <td>第{(index + 1)}题</td>
          <td>{item.content} </td>
          <td>{answerType(item.answerType)}</td>
          <td>{answer(item.answerType, item.answer)}</td>
          <td>{answer(item.teacherCommentType, item.teacherComment2)}
          <Row>
            <p>提交批阅结果：</p>
            <Upload
              listType="text"
              action="http://127.0.0.1:80/api/file"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              beforeUpload={beforeUpload}
              onChange={onChange}
              onSuccess={onSuccess.bind(this, index, '3')}
              onError={onError}
              onRemove={onRemove}
              limit={1}
              // defaultValue={[{
              //   name: 'IMG.png',
              //   state: 'done',
              //   size: 1024,
              //   downloadURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
              //   imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
              // }]}
            >
              <Button type="normal" style={{ margin: '0 0 10px' }}>图片上传</Button>
            </Upload>

            <Upload
              listType="text"
              action="http://127.0.0.1:80/api/file"
              accept=".doc,.ppt,.docx,.txt"
              beforeUpload={beforeUpload}
              onChange={onChange}
              onSuccess={onSuccess.bind(this, index, '4')}
              onError={onError}
              onRemove={onRemove}
              limit={1}
              // defaultValue={[{
              //   name: 'IMG.png',
              //   state: 'done',
              //   size: 1024,
              //   downloadURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
              //   imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
              // }]}
            >
              <Button type="normal" style={{ margin: '0 0 10px' }}>文件上传</Button>
            </Upload>
          </Row>
          </td>
          <td>
            <Input.TextArea
              onChange={this.inputChange.bind(this, index)}
              autoHeight={{ minRows: 5, maxRows: 100 }}
              value={typeof this.state.assignmentRecord[index] != 'undefined' ?
                this.state.assignmentRecord[index].teacherComment : '数据为空'}
              maxLength={100}
              aria-label="input max length 100"
              placeholder="TextArea"
              rows={4}
              hasLimitHint
            />&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td>
            <Rating
              value={typeof this.state.assignmentRecord[index] != 'undefined' ?
                this.state.assignmentRecord[index].grade : 1}
              size="small"
              count={5}
              showGrade
              allowHalf
              onChange={this.ratingChange.bind(this, index)}
            />
          </td>
        </tr>

      );
    });

    return (


      <div>
        <IceContainer title={'批改作业'}>
          <table>
            <tr>
              <th>题目</th>
              <th>内容</th>
              <th>答案类型</th>
              <th>答案</th>
              <th>教师批阅</th>
              <th>文字批注</th>
              <th>得分</th>
            </tr>
            {list}
          </table>
        </IceContainer>

        <IceContainer title={'评分'}>

          <Rating value={this.state.assignmentStat.grade}
                  size="small"
                  count={10}
                  showGrade
                  allowHalf
                  hasLimitHint
                  onChange={this.ratingChange2}
          />
        </IceContainer>

        <IceContainer title={'评分&提交'}>
          <Button type="primary" onClick={this.buttonClick} style={{ margin: '0 0 10px' }}>提交批改记录</Button>
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
