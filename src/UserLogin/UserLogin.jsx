/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next/lib/index';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import { Radio } from '@alifd/next';
import store  from '../store/index'
import {setadmintoken,setstudenttoken,setteachertoken} from '../store/actionCreators';
//获取后台数据
import axios from 'axios';


@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        userType:'student',
      },
      store:store.getState(),
      response:{},
    };


    this.adminlogin=this.adminlogin.bind(this);
    this.teacherlogin=this.teacherlogin.bind(this);
    this.studentlogin=this.studentlogin.bind(this);
  }

  formChange = (value) => {
    this.setState({
      value,
    });
    console.log("输入框发生变化")
    console.log(this.state.value)
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const usertype= this.state.value.userType;
      if(usertype==='admin'){
        this.adminlogin();
      }else if(usertype==='student'){
        this.studentlogin();
      }else{
        this.teacherlogin();
      }
    });
  };


  teacherlogin=()=>{
    console.log("username="+this.state.value.username);
    console.log("password="+this.state.value.password);
    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/teacher/login',
      params: {
        no:this.state.value.username,
        pw:this.state.value.password
      }
    })
      .then((response) => {
        console.log(response.data);

        this.setState({
          response:response.data
        })

        if(this.state.response.status===1){

          const action=setteachertoken(this.state.response.data);
          store.dispatch(action);

          Message.success('登录成功{教师账户}');
          this.props.history.push('/teacher');
        }else{
          Message.error('登录失败,密码或账号错误');
          // this.props.history.push('/');
        }

      })
      .catch(function (error) {
        Message.error('网络错误');
        console.log(error);
      });

  }

  studentlogin=()=>{
    console.log("username="+this.state.value.username);
    console.log("password="+this.state.value.password);
    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/student/login',
      params: {
        no:this.state.value.username,
        pw:this.state.value.password
      }
    })
      .then((response) => {
        console.log(response.data);

        this.setState({
          response:response.data
        })

        if(this.state.response.status===1){

          const action=setstudenttoken(this.state.response.data);
          store.dispatch(action);

          Message.success('登录成功{学生账户}' );
          this.props.history.push('/student');
        }else{
          Message.error('登录失败,密码或账号错误');
          // this.props.history.push('/');
        }

      })
      .catch(function (error) {
        Message.error('网络错误');
        console.log(error);
      });

  }

    adminlogin=()=>{
    console.log("username="+this.state.value.username);
    console.log("password="+this.state.value.password);
    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/admin/login',
      params: {
        no:this.state.value.username,
        pw:this.state.value.password
      }
    })
      .then((response) => {
        console.log(response.data);

        this.setState({
          response:response.data
        })

        if(this.state.response.status===1){

          const action=setadmintoken(this.state.response.data);
          store.dispatch(action);
          Message.success('登录成功{管理员账户}');
          this.props.history.push('/admin');
        }else{
          Message.error('登录失败,密码或账号错误');
          // this.props.history.push('/');
        }

      })
      .catch(function (error) {
        Message.error('网络错误');
        console.log(error);
      });

  }

  radioChange=(value)=>{
    console.log("选择框执行了"+value.toString());
      this.setState({
        value: {
          username: this.state.value.username,
          password: this.state.value.password,
          userType:value,
        },
      })
    console.log()
  }

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="username" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="学号"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="username" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>

                <Radio.Group
                  itemDirection='hoz'
                  onChange={this.radioChange}
                  value={this.state.value.userType}
                >
                  <Radio value="student">学生</Radio>
                  <Radio value="teacher">老师</Radio>
                  <Radio value="admin">管理员</Radio>
                </Radio.Group>


            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
            </div>
          </div>
        </IceFormBinderWrapper>
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

export default UserLogin;
