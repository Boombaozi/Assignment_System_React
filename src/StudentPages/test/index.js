import React, { Component } from 'react';

import axios from 'axios';
import { Message ,Form, Button, Input, Select, Radio, Checkbox, DatePicker, Switch, Upload } from '@alifd/next';
import store from '../../store'
import { Rating } from '@alifd/next';
import IceContainer from '@icedesign/container';
const FormItem = Form.Item;

function onSuccess(info) {
  console.log('onSuccess : ', info);
}
function onError(err) {
  console.log('onError : ', err);
}


function beforeUpload(file, uploadOptions) {

    // uploadOptions.headers = {'Access-Control-Allow-Origin': null};// 需要跨域上传的话加这一段
    // // uploadOptions.action = data.host;
    return uploadOptions;
  }



export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  buttonClick=()=>{
    console.log('点击了按钮');
  }

  inputChange=()=>{

    console.log('输入框发生了改变');
  }

  render() {


    return (
      <div>

        <IceContainer title={'文件上传测试'}>


        <Upload
          action="http://127.0.0.1:80/api/file"
          onSuccess={onSuccess}
          onError={onError}
          beforeUpload={beforeUpload}
        >
          <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
        </Upload>

        </IceContainer>


        <IceContainer title={'评分测试'}>

        <Rating defaultValue={3.2}
                size="small"
                count={10}
                showGrade
                allowHalf
                onChange={val => console.log('change:', val)}
        />
        </IceContainer>


        <IceContainer title={'按钮测试'}>

          <Button type="primary" onClick={this.buttonClick}  style={{ margin: '0 0 10px' }}>图片上传</Button>

        </IceContainer>

        <IceContainer title={'文本输入框'}>
        <Input.TextArea
          onChange={this.inputChange}
          autoHeight={{ minRows: 5, maxRows: 100 }}
          value='1213'
          maxLength={100}
          aria-label="input max length 100"
        />&nbsp;&nbsp;&nbsp;&nbsp;
        </IceContainer>
      </div>
    );
  }
}
