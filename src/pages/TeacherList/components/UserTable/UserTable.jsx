import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Icon,
  Pagination, Table,
} from '@alifd/next';
import { Input, Button, Checkbox, Message } from '@alifd/next/lib/index';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import axios from 'axios';


class Demo extends React.Component {


}

@withRouter
export default class UserTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      s: '',
      TeacherList: [],
    };

    this.onAdd = this.onAdd.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let s = nextProps.TeacherList;
    console.log(s);
    console.log('组件装载完毕');
    this.setState({
      TeacherList: s,
    });
  }

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData(10);
      },
    );
  };

  handleDelete = (id) => {
    this.props.delete(id);
  };

  handleEdit = (record) => {
    this.props.history.push({ pathname: "/admin/teacher/edit", state: record });
  };


  onAdd() {
    this.props.history.push('/admin/teacher/add');
  }

  renderOper = (value, index, record) => {
    // console.log(value);
    // console.log(index);
    // console.log(record);
    return (
      <div>
        <Icon
          type="edit"
          size="small"
          // style={{ ...styles.icon, ...styles.editIcon }}
          onClick={() => this.handleEdit(record)}
        />
        <Icon
          type="ashbin"
          size="small"
          // style={{ ...styles.icon, ...styles.deleteIcon }}
          onClick={() => this.handleDelete(record.id)}
        />
      </div>
    );
  };
  // "id": 520,
  // "no": "171209 ",
  // "password": "EA48576F30BE1669971699C09AD05C94",
  // "name": "张延 ",
  // "college": "计算机学院",
  // "status": "1",
  // "email": null

  getTeacherList(){
    axios.get('http://127.0.0.1/api/teacher/like?s='+this.state.s)
      .then((response) => {
        console.log(response.data);
        const my=response.data.data;

        this.setState({
          TeacherList: my,
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange = (value) => {
    console.log({ value });

    this.setState({
      s: value,
    });

  };

  buttonClick=()=>{
    this.getTeacherList();
  }

  render() {
    return (

      <div>
        <IceContainer title={'关键字搜索'}>
          {/*<div style={styles.label}>关键字搜索:</div>*/}
          <Input placeholder="请输入关键字" hasClear onChange={this.onChange} />
          <Button type="primary" style={styles.button} onClick={this.buttonClick}>
            查 询
          </Button>
        </IceContainer>

        <p><Button onClick={this.onAdd}>添加教师</Button></p>
        <Table dataSource={this.state.TeacherList}>
          <Table.Column title="账号" dataIndex="no" width={240}/>
          <Table.Column title="姓名" dataIndex="name" width={140}/>
          <Table.Column title="学院" dataIndex="college" width={140}/>
          <Table.Column title="邮箱" dataIndex="email" width={140}/>
          <Table.Column title="操作" width={200} cell={this.renderOper}/>
        </Table>
        {/*<Pagination onChange={this.onChange} className="page-demo"/>*/}
      </div>
    );
  }
}

const styles = {
  headRow: {
    marginBottom: '10px',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

