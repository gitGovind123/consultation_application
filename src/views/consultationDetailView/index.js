import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Button, Card, Modal, Input } from 'antd';
import { singleConsultation, onEscalate, onPrescribe } from "../../actions";
import * as TYPES  from "../../actions/types";

const { TextArea } = Input;
class Index extends Component {
    constructor(props) {
        super(props);
        this.getType = this.getType.bind(this)
        this.escalate = this.escalate.bind(this)
        this.prescribe = this.prescribe.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            isModalVisible:false,
            reasonForEscalate:null,
            error:false
        }
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.singleConsultation(this.props.match.params.id)
        } else {
            this.props.history.push('/')
        }
    }

    showModal = () => {
        this.setState({
            isModalVisible:true
        })
    };

    handleOk = () => {
        if(this.state.reasonForEscalate) {
            this.escalate();
            this.setState({
                isModalVisible: false,
                reasonForEscalate:null,
                error:false
            })
        }else{
            this.setState({
                error:true
            })
        }
    };

    handleCancel = () => {
        this.setState({
            isModalVisible:false
        })
    };

    getType = (value) => {
        return value && value !== '' ? value.replace(/_/g, ' ')
            .replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            ) : '';
    }

    escalate = () => {
        this.props.onEscalate(this.props.match.params.id,this.state.reasonForEscalate)
    }

    prescribe = () => {
        this.setState({
            reasonForEscalate:null
        },()=>{
            this.props.onPrescribe(this.props.match.params.id,this.state.reasonForEscalate)
        });

    }

    handleChange = (e) => {
        this.setState({
          reasonForEscalate:e.target.value
        })
    }

    render() {
        const { consultationDetails } = this.props;
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Consultation</Breadcrumb.Item>
                    <Breadcrumb.Item>Details</Breadcrumb.Item>
                </Breadcrumb>
                <Card
                    bordered={true}
                    style={{ width: 700 }}
                    title={
                        consultationDetails ?
                            `Subscription - Submitted: ${consultationDetails.creationDate} - Last Update: ${consultationDetails.updationDate ? consultationDetails.updationDate : consultationDetails.creationDate}`
                            : `Subscription`
                    }
                >
                    <h2>
                        {
                            consultationDetails ?
                                `${this.getType(consultationDetails.type)} - ${this.getType(consultationDetails.firstName.concat(' ', consultationDetails.lastName))}`
                                : ''
                        }
                    </h2>
                    <p>
                        <span><b>DOB</b>: None</span>
                        <span style={{marginLeft:'20px'}}><b>Email</b>: None</span>
                    </p>
                    <p><b>Skin Type</b>: None</p>
                    <p><b>Secondary Concerns</b>: None</p>
                    <p><b>Patient Reports </b>: None</p>
                    <p><b>Previous Skin treatments </b>: None</p>
                    <p><b>Medical Medicines </b>: None</p>
                    <p><b>Current Medicines </b>: None</p>
                    <p><b>Previous reactions to medicines </b>: None</p>
                    <p><b>Allergis</b>: None</p>
                    <p><b>Status</b>: {this.getType(consultationDetails.status)}</p>
                    {this.getType(consultationDetails.reason) ?
                      <p><b>Reason</b>: {this.getType(consultationDetails.reason)}</p>
                      :null
                    }
                    <p>
                        {
                            consultationDetails ?
                                   <>
                                    <Button type="primary" size="small" onClick={this.showModal}>
                                        {
                                            this.getType(TYPES.ENUM_STATUS.ESCALATE)
                                        }
                                    </Button>

                                    <Button type="primary" size="small" onClick={this.prescribe} style={{marginLeft:'20px'}}>
                                        {
                                            this.getType(TYPES.ENUM_STATUS.PRESCRIBE)
                                        }
                                    </Button>
                                   </>
                                : null
                        }
                    </p>
                </Card>
                <Modal title="Reason For Escalate " visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <TextArea
                        value={this.state.reasonForEscalate}
                        onChange={this.handleChange}
                        showCount
                        maxLength={100} />
                    {this.state.error ?
                        <span style={{color:'red'}}>
                            Please enter reason for Escalate
                        </span>
                        :null
                    }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        consultationDetails : (
            state.consultation.selectedConsultation
                ? {...state.consultation.selectedConsultation}
                : null
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    singleConsultation: (id) => dispatch(singleConsultation(id)),
    onEscalate: (id, reason) => dispatch(onEscalate(id, reason)),
    onPrescribe: (id, reason) => dispatch(onPrescribe(id, reason))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);