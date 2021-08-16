import React from 'react';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    Layout,
    Button,
    notification
} from 'antd';

import './index.css';
import { fetchAllData, logoutUser } from '../../actions';

import ConsultationDetailView from '../../views/consultationDetailView';
import InitialConsultations from '../../views/initialConsultations';
import Escalations from '../../views/escalations';
import Time from '../../views/time';
import HeaderComp from '../header'
import SideBarComp from '../sidebar'
import FooterComp from '../footer'

const OpenNotificationWithIcon = (type, close) => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={close}>
            Confirm
        </Button>
    );
    notification[type]({
        message: 'Inactivity Info',
        description: 'You are inactive from last 10 min so logout your application',
        btn,
        key,
        onClose: close
    })
};

class LayoutWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 600000,
            timeLogForRouter: []
        };
    }

    componentDidMount() {
        this.props.convertCsvData();
        this.getHistoryForRoute();
    }

    logout = async () => {
        await this.props.logoutUser()
        this.props.history.push('/login');
    }

    onIdle = () => {
        OpenNotificationWithIcon('info', this.logout);
    }

    getHistoryForRoute = () => {
        this.props.history.listen((location) => {
            let timeLog = [];
            this.state.timeLogForRouter[this.state.timeLogForRouter.length - 1] = {
                ...this.state.timeLogForRouter[this.state.timeLogForRouter.length - 1],
                endDate: new Date()
            } ;
            timeLog.push(
                ...this.state.timeLogForRouter,
                {
                    path: location.pathname,
                    startDate: new Date()
                }
            );

            this.setState({
                timeLogForRouter: timeLog
            })
        })
    }

    render() {
        return (
            <IdleTimer
                debounce={250}
                element={document}
                onIdle={this.onIdle}
                timeout={this.state.timeout}
            >
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderComp logout={this.logout} />
                    <SideBarComp />
                    <Layout>
                        <div className='site-layout-background' style={{ padding: 24, minHeight: 600 }}>
                            <Switch>
                                <Route component={ConsultationDetailView} path='/consultation/:id' />
                                <Route exact component={InitialConsultations} path='/' />
                                <Route component={Escalations} path='/escalations' />
                                <Route path='/time' render={() => <Time timeLogForRouter={this.state.timeLogForRouter} />} />
                            </Switch>
                        </div>
                        <FooterComp />
                    </Layout>
                </Layout>
            </IdleTimer>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    convertCsvData: () => dispatch(fetchAllData()),
    logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(LayoutWrapper);