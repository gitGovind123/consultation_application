import React from 'react';
import {
    Layout,
    Menu
} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    FieldTimeOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { Sider } = Layout;
class SideBarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className='logo' style={{height:'60px'}} />
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
                    <Menu.Item key='1' icon={<DesktopOutlined />}>
                        <Link to='/'>Initial Consultation
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<FileOutlined />}>
                        <Link to='/escalations'>Escalations
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='3' icon={<FieldTimeOutlined />}>
                        <Link to='/time'>Time
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default SideBarComp;