import React from "react";
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const EventsTable = ({ eventsData, reasonShow }) => {
    const tableColumns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Consult Type',
            dataIndex: 'type',
            key: 'title',
            sorter: (a, b) => a.type.localeCompare(b.type)
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => a.country.localeCompare(b.country)
        },
        {
            title: 'Consultation DateTime',
            dataIndex: 'creationDate',
            key: 'creationDate',
            sorter: (a, b) => a.creationDate.localeCompare(b.creationDate),
        },
        {
            title: 'Time Left',
            dataIndex: 'timeLeft',
            key: 'timeLeft',
            render: (text, record) => {
                let lDate = new Date(record.creationDate);
                lDate.setHours( lDate.getHours() + 8 );
                const diff = (new Date().getTime() - lDate.getTime()) / (86400000)
                const color = diff < 0 ? 'green' : 'red'
                const str = diff < 0 ? ' days left' : ' days ago'
                return <Tag color={color} key={diff}>
                    {Math.abs(Math.floor(diff))}{str}
                </Tag>
            }
        }
    ];

    if (reasonShow) tableColumns.push({
        title: 'Reason for Escalate',
        dataIndex: 'reason',
        key: 'reason',
        className:'reason_tab',
        ellipsis:true
    })

    tableColumns.push({
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Link to={`/consultation/${record.id}`}>
                Consultation
            </Link>
        )
    })

    return (
        <Table
            dataSource={eventsData}
            columns={tableColumns}
            filterMultiple={true}
        />
    )
};

export { EventsTable };
