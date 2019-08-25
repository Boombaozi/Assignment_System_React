import React, { Component } from 'react';
import { Icon, Grid, Pagination, Input, Button } from '@alifd/next';
import Filter from './Filter';
import { Link, withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
const { Row, Col } = Grid;

@withRouter
export default class CardList extends Component {
  static displayName = 'CardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};

    this.handleDelete=this.handleDelete.bind(this);

  }

  gettime = (time) => {
    console.log(time);
    const time2= new Date(time);

    return (
        time2.getFullYear() + '年 ' + (time2.getMonth()+1) + '月' + time2.getDay() + '日'
    );
  };


  handleDelete = ( item) => {
    console.log(item.c_no);
    this.props.delete(item.c_no+'');
  };

  handleEdit = (item) => {
    this.props.history.push({ pathname: "/admin/course/edit", state: item});
  };



  render() {

    return (
      <div style={styles.container}>


        <Row wrap gutter="20">
          <Col l="6" xs="12" xxs="24">

            <Link to="/admin/course/add">
            <div style={{ ...styles.card, ...styles.createScheme }}>
              <Icon type="add" size="large" style={styles.addIcon} />
              <span>新增课程</span>
            </div>
            </Link>
          </Col>
          {this.props.courseList.map((item, index) => {
            return (
              <Col l="6" xs="12" xxs="24" key={index}>
                <div style={styles.card}>
                  <div style={styles.head}>
                    {/*<Icon type="edit" style={styles.editIcon}*/}
                    {/*      onClick={()=>{this.handleEdit(item)}}/>*/}
                    <h4 style={styles.title}>{item.c_no}：{item.c_name}</h4>
                    <p style={styles.desc}>{item.t_college}</p>
                    <button onClick={()=>{this.handleDelete(item)}} >删除 </button>
                  </div>
                  <div style={styles.body}>
                    <p style={{ ...styles.creator, ...styles.info }}>
                      教师：
                      {item.t_name}

                    </p>
                    <p style={{ ...styles.creator, ...styles.info }}>
                      教师号：
                      {item.t_no}
                    </p>
                    <p style={{ ...styles.leader, ...styles.info }}>
                      班级：
                      {item.c_classname}
                    </p>
                    <p style={{ ...styles.time, ...styles.info }}>
                      开课时间：
                      {this.gettime(item.c_starttime)}
                    </p>
                    <p style={{ ...styles.time, ...styles.info }}>
                      结课时间：
                      {this.gettime(item.c_endtime)}

                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        {/*<Pagination onChange={this.onChange} className="page-demo"/>*/}
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fafafa',
  },
  createScheme: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '190px',
    cursor: 'pointer',
  },
  card: {
    displayName: 'flex',
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '6px',
  },
  head: {
    position: 'relative',
    padding: '16px 16px 8px',
    borderBottom: '1px solid #e9e9e9',
  },
  title: {
    margin: '0 0 5px',
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  desc: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  body: {
    position: 'relative',
    padding: '16px',
  },
  info: {
    margin: '0 0 8px',
    fontSize: '13px',
    color: '#666',
  },
  time: {
    position: 'relative',
  },
  addIcon: {
    marginRight: '10px',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  editIcon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    cursor: 'pointer',
  },
};
