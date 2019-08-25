import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next/lib/index';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';

const { Row, Col } = Grid;

@withRouter
export default class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      course:[],
    };


  }

  handlelist = (item) => {
    this.props.history.push({ pathname: "/teacher/course/alist", state: item });
  };
  handlelist2 = (item) => {
    this.props.history.push({ pathname: "/teacher/course/alist2", state: item });
  };

  handleadd = (item) => {
    this.props.history.push({ pathname: "/teacher/course/assignment/add", state: item });
  };

  gettime = (time) => {
    console.log(time);
    const time2= new Date(time);

    return (
      time2.getFullYear() + '年 ' + (time2.getMonth()+1) + '月' + time2.getDate() + '日'
    );
  };
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
  render() {
    return (
      <Row wrap gutter="15">
        {this.props.course.map((item, index) => {
          return (
            <Col l="8" key={index}>
              <IceContainer style={styles.container}>
                <div style={styles.body}>
                  <h5 style={styles.name}>{item.c_name}</h5>
                  <p style={styles.desc}>{item.c_classname}</p>
                  <p style={styles.desc}>{this.gettime(item.c_starttime)}-{this.gettime(item.c_endtime)}</p>
                  <div style={styles.tag}>{item.t_name}</div>
                </div>
                <div style={styles.footer}>
                  <a style={{ ...styles.link, ...styles.line }} onClick={() => this.handleadd(item)}  >
                    <Icon type="office" size="small" style={styles.icon} />{' '}
                    作业发布
                  </a>
                  <a  style={styles.link} onClick={() => this.handlelist(item)} >
                    <Icon type="box" size="small" style={styles.icon} />
                    作业批改
                  </a>
                  <a  style={styles.link} onClick={() => this.handlelist2(item)} >
                    <Icon type="box" size="small" style={styles.icon} />
                    作业管理
                  </a>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  body: {
    padding: '20px',
    height: '120px',
    position: 'relative',
    borderBottom: '1px solid #f0f0f0',
  },
  name: {
    margin: '0',
    padding: '0',
    height: '28px',
    lineHeight: '28px',
    fontSize: '16px',
    color: '#0d1a26',
  },
  desc: {
    fontSize: '14px',
    color: '#697b8c',
    margin: '12px 0',
  },
  tag: {
    background: '#fff0f6',
    border: '1px solid #ffadd2',
    color: '#eb2f96',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '4px 12px',
    textAlign: 'center',
    borderRadius: '50px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    height: '56px',
    lineHeight: '56px',
    color: '#314659',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
  line: {
    borderRight: '1px solid #f0f0f0',
  },
  icon: {
    marginRight: '5px',
  },
};
