import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import Table from '../../components/table/tableComp';
import * as TYPES from '../../actions/types';

class Index extends Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Initial Consultations</Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    list={this.props.list}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.consultation.data.filter(i=>i.status === TYPES.ENUM_STATUS.PRESCRIBE)
    }
}

export default connect(mapStateToProps, null)(Index);