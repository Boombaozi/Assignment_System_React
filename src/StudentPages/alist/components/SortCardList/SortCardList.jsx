import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {Grid, Message, Progress, Rating , Icon, Form, Button, Input, Select, Radio, Checkbox, DatePicker, Switch, Upload } from '@alifd/next';
const { Row, Col } = Grid;
import { withRouter } from 'react-router-dom';

const stateMap = {
0: { color: '#F4F7FF', text: '未完成' },
1: { color: '#FFFAE8', text: '已提交' },
2: { color: '#EAFCF6', text: '已阅' },
};

// 0: { color: '#F4F7FF', text: '未完成' },
// 1: { color: '#FFFAE8', text: '已提交' },
// 2: { color: '#EAFCF6', text: '已阅' },

function gettime(time){
  console.log("毫秒数:"+time);
  console.log("转换后:");

  let time2= new Date(time);
  console.log(  time2.getFullYear() + '年 ' +
    (time2.getMonth()+1) + '月' +
    time2.getDate() + '日' +
    time2.getTime())

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


    if(item.as_ischeck==='0') {
      let now=new Date();
      let start=new Date(item.a_starttime);
      let end=new Date(item.a_endtime);
      if(now<start||now>end){
        let mess="提交时间范围为"+gettime(item.a_starttime)+'至'+gettime(item.a_endtime);
        Message.error(mess);
        return;
      }
      this.props.history.push({ pathname: "/student/course/qlist", state: item });
    }else if(item.as_ischeck==='1'){
      Message.help("已提交，无法修改")
    }else if(item.as_ischeck==='2'){
      this.props.history.push({ pathname: "/student/course/result", state: item });
    }else {
      Message.help("题目状态错误")
    }


  };


  // private Long a_id;
  // private String a_courseNo;
  // private String a_className;
  // private String a_questionList;
  // private Date a_starttime;
  // private Date a_endtime;
  // private String a_name;
  // private String a_status;
  // private Long as_id;
  // private Long as_studentId;
  // private Long as_assignmentId;
  // private String as_ischeck;
  // private Integer as_grade;

  renderItem1 = (item,index) => {


    const ischeck=(ischeck)=>{

        if(ischeck==='0'){
          return '未完成'
        }else if(ischeck==='1'){
          return '已提交答案'
        }else {
          return '已阅'
        }
    }

    return (
      <div
        style={{
          ...styles.cardItem,
          ...{
            backgroundColor: stateMap[item.as_ischeck].color,
          },
        }}
        key={index}
        draggable
        onClick={() => this.handleClick(item)}
      >
        <div style={styles.desc}>{item.a_name}      ({item.a_className}班  )    有效时间： {gettime(item.a_starttime)} -{gettime(item.a_endtime)}</div>
        <div>
          <p>{ischeck(item.as_ischeck)} <Rating value={item.as_grade} allowHalf count={10} disabled size="small" /> 得分：{item.as_grade}  </p>





        </div>
      </div>
    );
  };

  workDone=(aList1)=>{

    let count=0;
    for (let i=0;i<aList1.length;i++){
       if(aList1[i].as_ischeck==='1'||aList1[i].as_ischeck==='2'){
         count++;
       }
    }
    if(aList1.length===0){
      return 100;
    }

    return (count/aList1.length)*100;

  }

  workDone3=(aList1)=>{
    //计算总分
    let count=0;
    //计算提交个数
    let count2=0;
    for (let i=0;i<aList1.length;i++){

        count+=aList1[i].as_grade;

      if(aList1[i].as_ischeck==='2'){
        count2++;
      }

    }
    if(count2===0){
      return 0;
    }

    return (count/count2);

  }

  workDone2=(aList1)=>{
    //计算批改个数
    let count=0;
    //计算提交个数
    let count2=0;
    for (let i=0;i<aList1.length;i++){
      if(aList1[i].as_ischeck==='2'){
        count++;
      }
      if(!(aList1[i].as_ischeck==='0')){
        count2++;
      }

    }
    if(count2===0){
      return 0;
    }
    return (count/count2)*100;

  }



  render()   {



    const  aList1 = this.props.aList1;



    const  aList2 = this.props.aList2;
    let course=this.props.course;


    let workDone= this.workDone(aList1);
    let workDone2=this.workDone2(aList1);
    let workDone3=this.workDone3(aList1);


    //如果没有数据，显示的页面
    if(aList1.length<1){
      return (
        <div className="sort-card-list">
          <h2>{course.c_name}课程作业列表</h2>

          <IceContainer>
            <h5>平均分：{10}</h5>
            <Rating value={10}
                    size="small"
                    count={10}
                    showGrade
                    allowHalf
                    disabled
                    hasLimitHint
            />
          </IceContainer>
          <IceContainer>
            <Row>
              <h5>作业完成：</h5>
              <Progress percent={100} size="small" shape="circle" /> &nbsp;&nbsp;
              <h5>作业批改：</h5>
              <Progress percent={100} shape="circle" size="small" state="success"/>
            </Row>
          </IceContainer>
          <IceContainer>
            <h1>作业列表为空！！！</h1>
          </IceContainer>
        </div>

      )
    }

    return (
      <div className="sort-card-list">
        <h2>{course.c_name}课程作业列表</h2>
        <IceContainer>
          <h5>平均分：{workDone3}</h5>
          <Rating value={workDone3}
                  size="small"
                  count={10}
                  showGrade
                  allowHalf
                  disabled
                  hasLimitHint
          />
        </IceContainer>
        <IceContainer>
       <Row>
          <h5>作业完成：</h5>
        <Progress percent={workDone} size="small" shape="circle" /> &nbsp;&nbsp;
          <h5>作业批改：</h5>
          <Progress percent={workDone2} shape="circle" size="small" state="success"/>
       </Row>
        </IceContainer>
        <IceContainer>
          <Row >
            <Col span="12" >
              {aList1.map(this.renderItem1)}
            </Col>
            {/*<Col xxs="24" s="8" l="12" style={styles.cardList}>*/}
            {/*  <div style={styles.title}>已截止</div>*/}
            {/*  <div style={styles.subTitle}>已经禁止提交的作业</div>*/}
            {/*  {aList2.map(this.renderItem2)}*/}
            {/*</Col>*/}
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
