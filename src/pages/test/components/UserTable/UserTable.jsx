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
      studentList: [],
    };

    this.onAdd = this.onAdd.bind(this);
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

  componentWillReceiveProps(nextProps){
    let s = nextProps.studentList;
        console.log(s);
        console.log('组件装载完毕');
        this.setState({
          studentList: s,
        });
  }

  getStudentList(){
    axios.get('http://127.0.0.1/api/student/like?s='+this.state.s)
      .then((response) => {
        console.log(response.data);
        const my=response.data.data;

        this.setState({
          studentList: my,
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // componentDidMount() {
  //
  //   setTimeout(function () {
  //     // let s = this.props.studentList;
  //     // console.log(this.props.studentList);
  //     // console.log(s);
  //     // console.log('组件装载完毕');
  //     // this.setState({
  //     //   studentList: s,
  //     // });
  //     alert('Hello');
  //
  //
  //   }, 2000);
  //
  //   setTimeout(this.before.bind(this,this.props.studentList)
  //     , 3000);
  //
  //
  // }
  //
  // before=(list)=>{
  //   console.log(list);
  // }

  handleDelete = (id) => {
    this.props.delete(id);
  };

  handleEdit = (record) => {
    this.props.history.push({ pathname: '/admin/student/edit', state: record });
  };


  onAdd() {
    this.props.history.push('/admin/student/add');
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

  onChange = (value) => {
    console.log({ value });

    this.setState({
      s: value,
    });

  };

  buttonClick=()=>{
    this.getStudentList();
  }

  render() {
    return (

      <div>
        <IceContainer title={'关键字搜索'}>
          {/*<div style={styles.label}>关键字搜索:</div>*/}
          <Input value={this.state.s} placeholder="请输入关键字" hasClear onChange={this.onChange}/>
          <Button type="primary" style={styles.button}   onClick={this.buttonClick} >
            查 询
          </Button>
        </IceContainer>

        <p><Button onClick={this.onAdd}>添加学生</Button></p>
        <Table dataSource={this.state.studentList}>
          <Table.Column title="学号" dataIndex="no" width={240}/>
          <Table.Column title="姓名" dataIndex="name" width={140}/>
          <Table.Column title="学院" dataIndex="college" width={140}/>
          <Table.Column title="专业" dataIndex="major" width={240}/>
          <Table.Column title="班级" dataIndex="studentClass" width={140}/>
          <Table.Column title="id" dataIndex="id" width={140}/>
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

