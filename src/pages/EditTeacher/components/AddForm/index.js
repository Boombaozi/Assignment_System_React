/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Select, Grid, Message } from '@alifd/next';
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
    teacher: this.props.value
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

    console.log(this.state.student);
    axios({
      method: 'put',
      url: 'http://127.0.0.1/api/teacher',
      params: this.state.teacher
    })
      .then((response) => {
        console.log(response.data);
        Message.success('提交成功');
      })
      .catch(function (error) {
        Message.success('提交失败。请重试');
        console.log(error);
      });
  }



  render() {
    return (
      <IceContainer>
        <IceFormBinderWrapper value={this.state.teacher} ref="form">
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>修改教师数据</h2>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                账号：
              </Col>
              <Col l="5">
                <IceFormBinder name="no" required max={20}  message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="账号"
                  />
                </IceFormBinder>
                <IceFormError name="no" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                姓名：
              </Col>
              <Col l="5">
                <IceFormBinder name="name" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="姓名"
                  />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                学院：
              </Col>
              <Col l="5">
                <IceFormBinder name="college" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="学院"
                  />
                </IceFormBinder>
                <IceFormError name="college" />
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col l="2" style={styles.label}>
                邮箱：
              </Col>
              <Col l="5">
                <IceFormBinder name="email" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}
                    placeholder="邮箱"
                  />
                </IceFormBinder>
                <IceFormError name="email" />
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
