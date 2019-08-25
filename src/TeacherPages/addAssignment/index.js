import React, { Component } from 'react';
import axios from 'axios';
import store from '../../store/index';
import { Button, Input, Message, Radio, Form, Grid, Checkbox, DatePicker,Select  } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter, Link } from 'react-router-dom';
import IcePanel from '@icedesign/panel';
import moment from 'moment';
moment.locale('zh-cn');

const Option = Select.Option;
const { Row, Col } = Grid;
const FormItem = Form.Item;
// const formItemLayout = {
//   labelCol: {
//     fixedSpan: 10
//   },
//   wrapperCol: {
//     span: 14
//   }
// };
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
// className:this.state.assignment.className,
//   courseNo:this.state.assignment.courseNo,
//   name:this.state.assignment.name,
//   starttime:this.state.assignment.starttime,
//   endtime:this.state.assignment.endtime,
//   questionList:this.state.assignment.questionList,

const show = () => {
  Message.show({
    type: 'loading',
    content: '正在发布作业',
    duration:0
  });
};
const hide = () => Message.hide();

@withRouter
export default class addAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //出题表单信息
      content: {
        content: '',
      },
      //加载按钮
      loading: false,
      //题目列表维护
      question: [],
      questionid: [],

      //目前的作业表单信息
      assignment: {
        name: '',
        className: '',
        courseNo: '',
        questionList: '',
        starttime: '',
        endtime: '',
      },
      list:{},
      count:1,
      q:'',
      //登录用户信息
      store: store.getState(),
    };

    this.before = this.before.bind(this);


  }

  componentWillMount(){

    console.log(this.state.store);
    if (this.state.store.userType === null || this.state.store.userType.length === 0) {
      Message.error('请登录');
      this.props.history.push('/');
    }

    this.before();

  }

  // c_classname: "计1504,计1503"
  // c_endtime: 1561597183000
  // c_id: 1
  // c_name: "数据库基础"
  // c_no: "C1"
  // c_starttime: 1553644800000
  // t_college: "计算机学院"
  // t_id: 1
  // t_name: "李老师"
  // t_no: "10001"
  getQuestion(content) {
    console.log(content);
    axios({
      method: 'get',
      url: 'http://127.0.0.1/api/question/content/' + content.content,
      // params: this.state.student,
    })
      .then((response) => {
        console.log(response.data);
        const my = response.data.data;

        this.setState({
          question: this.state.question.concat([my[0]]),
          questionid: this.state.questionid.concat([my[0].id]),
        });

        let questionList = encodeURI( JSON.stringify(this.state.questionid));

        this.setState({
          assignment: {
            className: this.state.assignment.className,
            courseNo: this.state.assignment.courseNo,
            name: this.state.assignment.name,
            starttime: this.state.assignment.starttime,
            endtime: this.state.assignment.endtime,
            questionList: questionList,
          },
        });

        Message.success('更新题目信息成功');

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  handleSubmit = () => {
    console.log(this.state.content);
    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/question',
      params: this.state.content,
    })
      .then((response) => {
        console.log(response.data);
        Message.success('题目提交成功');
        this.getQuestion(this.state.content);
      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
      });
  };

  handleSubmit2 = () => {

  if(!(this.state.loading)) {
    show();
    console.log(this.state.assignment);
    this.setState({
      loading:true
    })

    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/assignment',
      params: this.state.assignment,
    })
      .then((response) => {
        console.log(response.data);
        hide();
        Message.success('作业发布成功');
        this.setState({
          loading:false
        })
        this.props.history.push('/teacher/course');

      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
        this.setState({
          loading:false
        })
      });
  }else {
    console.log("禁止提交（提交中）")
  }


  };

  onChange1 = val => {
    if(val===null){
      return;
    }
    console.log(val);
    console.log(val._d);
    let date = new Date(val._d);
    let date_value = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    console.log('选择的日期为',date_value);

    this.setState({
      assignment: {

        className: this.state.assignment.className,
        courseNo: this.state.assignment.courseNo,
        name: this.state.assignment.name,

        endtime: this.state.assignment.endtime,
        questionList: this.state.assignment.questionList,
        starttime: date_value,
      },
    });
  };

  onChange2 = val => {
    if(val===null){
      return;
    }
    console.log(val._d);
    let date = new Date(val._d);
    let date_value = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    let time_value= date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    console.log('选择的日期为',date_value+time_value);


    this.setState({
      assignment: {

        className: this.state.assignment.className,
        courseNo: this.state.assignment.courseNo,
        name: this.state.assignment.name,
        starttime: this.state.assignment.starttime,

        questionList: this.state.assignment.questionList,
        endtime:date_value+' '+time_value,
      },
    });

  };
  classinputChange = (value) => {
    console.log(value);
    this.setState({
      assigment: {
        className: value,
      },
    });
  };
  nameinputChange = (value) => {
    console.log(value);

    let name=  '第'+this.state.count+'次作业'+ '('+value+')';

    this.setState({
      assignment: {
        className: this.state.assignment.className,
        courseNo: this.state.assignment.courseNo,
        starttime: this.state.assignment.starttime,
        endtime: this.state.assignment.endtime,
        questionList: this.state.assignment.questionList,
        name:name,
      },
    });

  };
  inputChange = (value) => {
    console.log(this.state.q);
    let content=this.state.q+'：'+ value;

    this.setState({
      content: {
        content:content,
      },
    });
    console.log('输入框1发生变化');
    console.log(this.state.content);


  };
  inputChange2 = (value) => {
    console.log(value);
    this.setState({
      q:value

    });

    // this.setState({
    //   content: {
    //     content:"",
    //   },
    // });
    console.log('输入框2发生变化');
    console.log(this.state.content);


  };



  before() {

    console.log('传入的数据为');
    console.log(this.props.location.state);
    const data = this.props.location.state;

    //获取现在时间
    let date=new Date();
    let date2=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    console.log('现在的时间为',date2);


      axios({
        method: 'get',
        url: 'http://127.0.0.1/api/assignment/all/'+data.c_no,
        // params: this.state.student,
      })
        .then((response) => {
          console.log(response.data);
          const my = response.data.data;

          const set1 = new Set();
          for (let i=0;i<my.length;i++){
            set1.add(my[i].name);
          }

          this.setState({
            list: my,
            count:set1.size+1
          });

          //填入 第几次作业数据
          let name='第'+this.state.count+'次作业';

          this.setState({
            assignment: {
              className: this.state.assignment.className,
              courseNo: this.state.assignment.courseNo,
              starttime: this.state.assignment.starttime,
              endtime: this.state.assignment.endtime,
              questionList: this.state.assignment.questionList,
              name:name,
            },
          });

        })
        .catch(function (error) {
          console.log(error);
        });


    this.setState({
        assignment: {
          className: data.c_classname,
          courseNo: data.c_no,
          name: this.state.assignment.name,
          questionList: this.state.assignment.questionList,
          starttime: date2,
          endtime: this.state.assignment.endtime,
        },
      },
    );
    // c_classname: "计1504,计1503"
    // c_endtime: 1561597183000
    // c_id: 1
    // c_name: "数据库基础"
    // c_no: "C1"
    // c_starttime: 1553644800000
    // t_college: "计算机学院"
    // t_id: 1
    // t_name: "李老师"
    // t_no: "10001"
  }

  // answer: null
  // choice: null
  // content: "4545"
  // correctChoice: null
  // createTime: 1556974820000
  // id: 18
  // questionType: "课后题"
  // status: "1"
  // subjectType: null
  // subjectType2: null

  render() {
    //输出组件状态变化
    console.log('数据为',this.state)

    //获取现在时间
    let date=new Date();
    let date2=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();



    const list = this.state.question.map((item, index) => {
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
        {/*<ol key={index}>*/}
        {/*  <li>*/}
        {/*    <h3>第{(index + 1)}题： </h3>*/}
        {/*    <a>题目类型:{item.questionType}</a>&nbsp;&nbsp;&nbsp;&nbsp;*/}
        {/*    <a>唯一id:{item.id}</a>&nbsp;&nbsp;&nbsp;&nbsp;*/}
        {/*    <a>内容:{item.content}</a>&nbsp;&nbsp;&nbsp;&nbsp;*/}
        {/*  </li>*/}
        {/*</ol>*/}
</div>
      );
    });


    return (


      <div>
        {/*//题目列表*/}
        <IceContainer title= {this.props.location.state.c_name +'第'+this.state.count+'次作业布置'}>
        </IceContainer>
        <IceContainer title={'已出题目列表'}>
          {list}
        </IceContainer>

        <IceContainer title={'出题'}>
          <Select value={this.state.q} onChange={this.inputChange2} style={{width: '12%'}}>
            <Option value="">无章节范围</Option>
            <Option value="第一章">第一章</Option>
            <Option value="第二章">第二章</Option>
            <Option value="第三章">第三章</Option>
            <Option value="第四章">第四章</Option>
            <Option value="第五章">第五章</Option>
            <Option value="第六章">第六章</Option>
            <Option value="第七章">第七章</Option>
            <Option value="第八章">第八章</Option>
            <Option value="第九章">第九章</Option>
          </Select>

          <Input.TextArea aria-label="auto height" onChange={this.inputChange}
                          autoHeight={{ minRows: 5, maxRows: 100 }}/>&nbsp;&nbsp;&nbsp;&nbsp;

          <Button type="secondary" onClick={this.handleSubmit}>提交题目</Button>
        </IceContainer>

        <IceContainer title={'作业信息填写'}>
          <FormItem label="作业次序：">
            第{this.state.count}次作业
          </FormItem>
          <Form>
            <FormItem label="课程编号：">
              {this.state.assignment.courseNo}
            </FormItem>

            {/*<FormItem label="题目列表：">*/}
            {/*  {this.state.assignment.questionList}*/}
            {/*</FormItem>*/}
            <FormItem label="班级列表：">
              {this.state.assignment.className}
            </FormItem>

            {/*<FormItem label="班级列表：" >*/}
            {/*<Input onChange={this.classinputChange} defaultValue={this.state.assignment.className}   placeholder=""/>*/}
            {/*<Button type="secondary" onClick={this.handleSubmit} >提交题目</Button>*/}
            {/*<FormItem/>*/}
            {/*defaultV*/}
            {/*defaultValue={date2}*/}

            <FormItem label="截止日期选择">
              <p>默认开始时间为今天:{date2}</p>
              <Row>
                {/*<DatePicker   format='YYYY-M-D' onChange={this.onChange1} /> <br /><br />*/}
                <DatePicker showTime  format='YYYY-M-D' onChange={this.onChange2} /> <br /><br />
              </Row>
            </FormItem>
            <FormItem label="备注：" style={{width: '30%'}}>
              <Input onChange={this.nameinputChange} placeholder="可为空"/>
            </FormItem>
            <FormItem label=" ">
              <Form.Submit type="primary" loading={this.state.loading} onClick={this.handleSubmit2}>布置该次作业</Form.Submit>
            </FormItem>
          </Form>
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
