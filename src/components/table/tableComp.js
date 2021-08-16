import React, { Component } from 'react';
import './table.css';

import { Input } from 'antd';
import { EventsTable } from './EventsTable';

const Search = Input.Search;
class EventsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsData: [],
            searchText: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            eventsData: nextProps.list
                .map(val => ({...val, name:val.firstName + ' ' + val.lastName }))
                .filter(record =>
                    record.name.toLowerCase().includes(prevState.searchText) ||
                    record.creationDate.includes(prevState.searchText) ||
                    record.country.includes(prevState.searchText) ||
                    record.type.includes(prevState.searchText)
                )
        };
    }

    onSearch = (e) => {
        this.setState({
            searchText: e ? e.target.value : ''
        });
    }

    render() {
        const { searchText, eventsData } = this.state;
        return (
            <section>
                <header className='header'>
                    <Search
                        size="large"
                        allowClear={true}
                        value={searchText}
                        onChange={this.onSearch}
                        onPressEnter={this.onSearch}
                        placeholder="Search Records"
                        style={{ width: 300 }}
                    />
                </header>
                <EventsTable
                    eventsData={eventsData}
                    reasonShow={this.props.reasonShow ? this.props.reasonShow : false}
                />
            </section>
        );
    }
}

export default EventsSection;