import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Icon,
  Pagination, Table,
} from '@alifd/next';
import { Input, Button, Checkbox, Message } from '@alifd/next/lib/index';


class Demo extends React.Component {


}

@withRouter
export default class UserTable extends Component {

  constructor(props) {
    super(props);
    this.state = {};

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

  handleDelete = (id) => {
    this.props.delete(id);
  };

  handleEdit = (record) => {
    this.props.history.push({ pathname: "/admin/student/edit", state: record });
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

  render() {
    return (

      <div>
        <p><Button onClick={this.onAdd}>添加学生</Button></p>
        <Table dataSource={this.props.studentList}>
          <Table.Column title="学号" dataIndex="no" width={240}/>
          <Table.Column title="姓名" dataIndex="name" width={140}/>
          <Table.Column title="学院" dataIndex="college" width={140}/>
          <Table.Column title="专业" dataIndex="major" width={240}/>
          <Table.Column title="班级" dataIndex="studentClass" width={240}/>
          <Table.Column title="id" dataIndex="id" width={240}/>
          <Table.Column title="操作" width={200} cell={this.renderOper}/>
        </Table>
        <Pagination onChange={this.onChange} className="page-demo"/>
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

