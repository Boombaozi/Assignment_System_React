import React, { Component } from 'react';

import axios from 'axios';
import { Grid, Message, Form, Button, Input, Select, Radio, Checkbox, DatePicker, Switch, Upload } from '@alifd/next';
import store from '../../store';
import IceContainer from '@icedesign/container';
import IcePanel from '@icedesign/panel';
import { Tab } from '@alifd/next';
import Img from '@icedesign/img';

const FormItem = Form.Item;
const { Row, Col } = Grid;

function onChange(info) {
  console.log('onChange callback : ', info);
}

function onSuccess(index, type, res, file) {
  Message.success('上传成功');
  console.log('onSuccess callback res : ', res);
  console.log('onSuccess callback file : ', file);
  console.log('onSuccess callback index : ', index);
  let assignmentRecord = this.state.assignmentRecord;
  assignmentRecord[index].answer = file[0].response.name;
  assignmentRecord[index].answerType = type;

  this.setState({
    assignmentRecord: assignmentRecord,
  });

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

//图片上传
function myimage(props) {
  return (
    <div>
      <h1>图片上传组件</h1>
    </div>

  );
}


//文本上传
function text(props) {
  return (
    <div>
      <h1>文本上传组件</h1>
    </div>

  );
}


export default class qlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //做题记录列表(提交给后端)
      assignmentRecord: [],
      //题目id 列表
      questionIdList: [],
      //题目列表
      questionList: [],
      //作业状态
      assignmentStat: {
        as_assignmentId: null,
        as_grade: null,
        as_id: null,
        as_ischeck: '0',
        as_studentId: null,
      },
      store: store.getState(),
    };

    this.getQuestionList = this.getQuestionList.bind(this);
    this.getQuestionList();
  }


  getQuestionList() {


    console.log('执行了请求函数');
    let list = JSON.parse(this.props.location.state.a_questionList);

    list.map((item, index) => {
      axios({
        method: 'get',
        url: 'http://127.0.0.1/api/question/' + item,
        // params: this.state.student,
      })
        .then((response) => {
          console.log(response.data);
          const my = response.data.data;

          this.setState({
            questionList: this.state.questionList.concat(my),
            assignmentRecord: this.state.assignmentRecord.concat({
              studentId: this.state.store.student.id,
              questionId: item,
              assignmentId: this.props.location.state.a_id,
              answerType: '3',
              answer: '',
            }),
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
  textChange = (index, value) => {

    console.log('输入框发生了改变', index, value);
    let change = this.state.assignmentRecord[index];
    change.answer = value;
    change.answerType = '2';

    let data = this.state.assignmentRecord;

    data[index] = change;

    this.setState({
      assignmentRecord: data,
    });


  };

  componentWillMount() {
    console.log('组件装载完毕');

    console.log('传入的参数为', this.props.location.state);

    this.setState({
      assignmentStat: {
        id: this.props.location.state.as_id,
        assignmentId: this.props.location.state.as_assignmentId,
        grade: 0,
        ischeck: '1',
        studentId: this.props.location.state.as_studentId,
      },
    });

    this.setState({
      questionIdList: JSON.parse(this.props.location.state.a_questionList),
    });

    console.log(this.state.store);
    if (this.state.store.userType === null || this.state.store.userType.length === 0) {
      Message.error('请登录');
      this.props.history.push('/');
    }


  }

  handleSubmit = () => {
    this.state.assignmentRecord.map((item, index) => {
      axios({
        method: 'post',
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


    Message.success('全部提交成功');

  };


  // a_className: "计1601"
  // a_courseNo: "C1"
  // a_endtime: 1557417600000
  // a_id: 113
  // a_name: "第一次作业"
  // a_questionList: "[175]"
  // a_starttime: 1556640000000
  // a_status: "1"
  // as_assignmentId: 113
  // as_grade: null
  // as_id: 113
  // as_ischeck: "0"
  // as_studentId: 1

  render() {

    console.log('新渲染的数据为');
    // console.log(this.props.location.state);
    console.log(this.state);


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

    const list = this.state.questionList.map((item, index) => {


      return (
        <div>

          <IcePanel key={index} status="success" style={{ marginBottom: '10px' }}>
            <IcePanel.Header>
              第{(index + 1)}题：
            </IcePanel.Header>
            <IcePanel.Body>
              {item.content}
            </IcePanel.Body>
          </IcePanel>
          <IcePanel style={{ marginBottom: '10px' }}>
            <IcePanel.Body>
              <Row>
                <p>答案提交：</p>
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
                <p>如答案形式为图片或文件，禁止修改文本框内容</p>
                <Input.TextArea
                  onChange={this.textChange.bind(this, index)}
                  autoHeight={{ minRows: 1, maxRows: 100 }}
                  value={typeof this.state.assignmentRecord[index] != 'undefined' ?
                    this.state.assignmentRecord[index].answer : '数据为空'}
                  maxLength={100}
                  aria-label="input max length 100"
                  placeholder="文本答案填写："
                  rows={4}
                  hasLimitHint
                />&nbsp;&nbsp;&nbsp;&nbsp;
              </Row>
              <p>当前答案形式：{answerType(this.state.assignmentRecord[index].answerType)}  (只能任选一种答案格式，以最后修改为准)</p>
            </IcePanel.Body>
          </IcePanel>

        </div>


      );
    });

    return (
      <div>
        <IceContainer title={'题目列表'}>
          {list}
        </IceContainer>

        <IceContainer title={'提交作业'}>
          <Form>
            <FormItem label=" ">
              <Form.Submit type="primary" loading={this.state.loading}
                           onClick={this.handleSubmit}>提交该次作业</Form.Submit>
            </FormItem>
          </Form>
        </IceContainer>
      </div>
    );
  }
}



