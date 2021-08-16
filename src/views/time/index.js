import React, { Component } from 'react';
import {Breadcrumb, Table } from 'antd';

class Index extends Component {
    render() {
        const tableColumns = [
            {
                title: 'Path Name',
                dataIndex: 'path',
                key: 'Path',
                render: (text) => {
                    return text === '/' ?
                        'Initial Consultation' :
                        (text === '/escalations') ?
                            'Escalations' :
                            (text === '/time') ?
                                'Time':
                                null
                }
            },
            {
                title: 'Start Time',
                dataIndex: 'startDate',
                key: 'startDate',
                render: (text) => {
                    return text && text.toLocaleString();
                }
            },
            {
                title: 'End Time',
                dataIndex: 'endDate',
                key: 'endDate',
                render: (text) => {
                    return text && text.toLocaleString();
                }
            }

        ];
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Time</Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    dataSource={this.props.timeLogForRouter}
                    columns={tableColumns}
                    filterMultiple={true}
                />
            </div>
        );
    }
}

export default Index;