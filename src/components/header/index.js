import React from 'react';
import { connect } from 'react-redux';
import {
    Layout,
    Menu,
    Dropdown
} from 'antd';
import {
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';

class HeaderComp extends React.Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key='0' onClick={this.props.logout}>
                    <div style={{width:'80px'}}>
                        <LogoutOutlined/> Logout
                    </div>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div  style={{ color:'#fff',textAlign:'right' }}>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        placement="bottomCenter"
                        arrow
                    >
                        <a
                            className='ant-dropdown-link'
                            onClick={e => e.preventDefault()}
                            style={{ color:'#fff' }}
                        >
                            <span style={{marginRight: '15px'}}>
                                {
                                    this.props.user && this.props.user.email
                                        ? this.props.user.email
                                        : ''
                                }
                            </span>
                            <UserOutlined />
                        </a>
                    </Dropdown>
                </div>
            </Layout.Header>
        );
    }
}
const mapStateToProps = state => ({
    ...state.auth
})
export default connect(mapStateToProps, null)(HeaderComp);