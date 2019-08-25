import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message } from '@alifd/next';

const { Row, Col } = Grid;
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const stateMap = {
  0: { color: '#F4F7FF', text: '未开始' },
  1: { color: '#FFFAE8', text: '进行中' },
  2: { color: '#EAFCF6', text: '已截止' },
};

function gettime(time){


  let time2= new Date(time);
  // console.log(  time2.getFullYear() + '年 ' +
  //   (time2.getMonth()+1) + '月' +
  //   time2.getDate() + '日' +
  //   time2.getTime())

  return (
    time2.getFullYear() + '年 ' +
    (time2.getMonth() + 1) + '月' +
    time2.getDate() + '日' +
    time2.getHours() + '点:' + time2.getMinutes()+'分'
  );
};

@withRouter
export default class SortCardList extends Component {
  static displayName = 'SortCardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // ICE: React Component 的生命周期



  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  //当点击时执行的方法
  handleClick = (item) => {
    this.props.history.push({ pathname: "/teacher/course/assignment/student", state: item });
  };


  //当点删除按钮时的方法
  buttonClick = (id) => {
    console.log(id);
    this.deleteAssignment(id);

  };

  deleteAssignment(id){
    axios.delete('http://127.0.0.1/api/assignment?id='+id)
      .then((response) => {
        Message.success("删除成功");
        console.log(response.data);
        this.props.history.push({ pathname: "/teacher/course", state:this.props.course });
      })
      .catch(function (error) {
        Message.error("删除失败");
        console.log(error);
      });
  }

  renderItem1 = (item) => {

    let question = JSON.parse(item.questionList);
    return (
      <div
        style={{
          ...styles.cardItem,
          ...{
            backgroundColor: stateMap[1].color,
          },
        }}
        key={item.id}
        draggable
        // onClick={() => this.handleClick(item)}
      >
        <div style={styles.desc}>{item.name}     ({item.className}班)   共：{question.length}题  <Button type="primary" warning size="small" onClick={()=>this.buttonClick(item.id)}>删除</Button> &nbsp;&nbsp;</div>
        <div>
          <p>{gettime(item.starttime)}--{gettime(item.endtime)} </p>

        </div>
      </div>
    );
  };

  renderItem2 = (item) => {

    let question = JSON.parse(item.questionList);


    return (
      <div
        style={{
          ...styles.cardItem,
          ...{
            backgroundColor: stateMap[2].color,
          },
        }}
        key={item.id}
        draggable
        // onClick={() => this.handleClick(item)}
      >
        <div style={styles.desc}>{item.name}     ({item.className}班)   共：{question.length}题  <Button type="primary" warning size="small" onClick={()=>this.buttonClick(item.id)}>删除</Button> &nbsp;&nbsp;</div>

        <div>
          <p>{gettime(item.starttime)}--{gettime(item.endtime)} </p>

        </div>
      </div>
    );
  };


  render() {
    const  aList1 = this.props.aList1;
    const  aList2 = this.props.aList2;
    let course=this.props.course;
    return (
      <div className="sort-card-list">
        <h2>{course.c_name}</h2>
        <IceContainer >
          <Row >
            <Col  >
              <div style={styles.title}>进行中</div>
              <div style={styles.subTitle}>当前学生可进行提交的作业</div>
              {aList1.map(this.renderItem1)}
            </Col>
            <Col  >
              <div style={styles.title}>已截止</div>
              <div style={styles.subTitle}>已经禁止提交的作业</div>
              {aList2.map(this.renderItem2)}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardList: {
    flex: 1,
  },
  title: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  subTitle: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  cardItem: {
    height: '80px',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '10px 16px',
    position: 'relative',
  },
  icon: {
    width: '11px',
    height: '11px',
    marginRight: '5px',
  },
  desc: {
    fontSize: '12px',
    marginBottom: '10px',
    height: '36px',
    lineHeight: '18px',
    overflow: 'hidden',
  },
  done: {
    fontSize: '12px',
    position: 'absolute',
    right: '16px',
    bottom: '10px',
    cursor: 'pointer',
  },
};
