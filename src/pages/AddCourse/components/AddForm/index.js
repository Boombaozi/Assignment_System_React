/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Select, Grid, Message ,DatePicker} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
//获取后台数据
import axios from 'axios';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;


export default class BaseSetting extends Component {
  state = {
    course: {
      no: 'C12345',
      name: '课程名称示例',
      className: '计科1601,计科1602',
      starttime: '2018/02/11',
      endtime: '2018/04/11',
      teacherNo: '10001',
    },
  };

  // validateAllFormField = () => {
  //   this.refs.form.validateAll((errors, values) => {
  //     if (errors) {
  //       return;
  //     }
  //     console.log(values);
  //     Message.success('提交成功');
  //   });
  // };


  validateAllFormField = () => {

    console.log(this.state.course);
    axios({
      method: 'post',
      url: 'http://127.0.0.1/api/course',
      params: this.state.course,
    })
      .then((response) => {
        console.log(response.data);
        Message.success('提交成功');
      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
      });
  };

  onChange1 = val => {
    console.log(val._d);
    let date=new Date(val._d);
    let date_value=date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    console.log(date_value);
    this.state.course.starttime=date_value;
  };
  onChange2 = val => {
    console.log(val._d);
    let date=new Date(val._d);
    let date_value=date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    console.log(date_value);

    this.state.course.endtime=date_value;

  };

  render() {
    return (
      <IceContainer>
        <IceFormBinderWrapper value={this.state.course} ref="form">
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>添加课程</h2>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                课程编号：
              </Col>
              <Col l="5">
                <IceFormBinder name="no" required max={20} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="课程编号"
                  />
                </IceFormBinder>
                <IceFormError name="no"/>
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                课程名称：
              </Col>
              <Col l="5">
                <IceFormBinder name="name" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="课程名称"
                  />
                </IceFormBinder>
                <IceFormError name="name"/>
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                班级(用英文逗号分隔)：
              </Col>
              <Col l="5">
                <IceFormBinder name="className" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="班级"
                  />
                </IceFormBinder>
                <IceFormError name="className"/>
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
              </Col>
              <Col l="5">

                <DatePicker  format="YYYY-M-D" onChange={this.onChange1} /> <br /><br />
                <DatePicker  format="YYYY-M-D" onChange={this.onChange2} /> <br /><br />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                教师号：
              </Col>
              <Col l="5">
                <IceFormBinder name="teacherNo" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder=""
                  />
                </IceFormBinder>
                <IceFormError name="teacherNo"/>
              </Col>
            </Row>


          </div>
        </IceFormBinderWrapper>

        <Row style={{ marginTop: 20 }}>
          <Col offset="3">
            <Button
              type="primary"
              style={{ width: 100 }}
              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
    color: '#333',
  },
  inputItem: {
    width: '100%',
  },
};
