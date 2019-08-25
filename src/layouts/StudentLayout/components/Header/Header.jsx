/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { PureComponent } from 'react';
import { Balloon, Icon, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';

import './scss/base.scss';
import store from '../../../../store';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  render() {
    const userType=this.state.userType;
    let userType2="";
    let userData={};
    if(userType==='admin'){
      userData=this.state.admin;
      userType2="管理员";
    }else if(userType==='student'){
      userData=this.state.student;
      userType2="学生";
    }else if(userType==='teacher'){
      userData=this.state.teacher;
      userType2="教师";
    }
    const { isMobile, className, style } = this.props;

    return (
      <Layout.Header
        theme={'dark'}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        <Logo />

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Nav direction="hoz" type="secondary" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Nav.Item key={idx} icon={nav.icon ? nav.icon: null}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Nav.Item>
                );
              })}
            </Nav>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name">{userData.name}</span>
                  <br />
                  <span className="user-department">{userType2}</span>
                </div>
                <Icon
                  type="arrow-down"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <Link to="/student/course">
              <li className="user-profile-menu-item">
                <Icon type="account" size="small" />
                我的主页
              </li>
              </Link>
              {/*<li className="user-profile-menu-item">*/}
              {/*  <Icon type="repair" size="small" />*/}
              {/*  设置*/}
              {/*</li>*/}
              <Link to="/">
                <li className="user-profile-menu-item">
                  <Icon type="compass" size="small" />
                  退出
                </li>
              </Link>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
