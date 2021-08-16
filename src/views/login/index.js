import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import { loginUser } from '../../actions'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 }
};

const Login = (props) => {
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        if(errors)
            openNotificationWithIcon('error')
    },[errors]);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'In Valid Email Password ',
            description: 'Invalid Email Password please Authenticate User'
        });
    };

    const onFinish = async (values) => {
        setErrors(false)
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(values.email)){
            await props.loginUser({email: values.email})
            props.history.push('/')
        }else{
            setErrors(true)
        }
    };

    return (
        <div style={{marginTop: '48px'}}>
            <Form
                {...layout}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={
                        [{
                            required: true,
                            message: 'Please input your email!'
                        }]
                    }
                >
                    <Input
                        placeholder='Email'
                    />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={
                        [{
                            required: true,
                            pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@$!%*?&#^()]{8,}$/,
                            message: 'Please input min 8 characters, at least uppercase, lowercase, number & special character!'
                        }]
                    }
                >
                    <Input.Password
                        placeholder='Password'
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: data => dispatch(loginUser(data))
    }
}
export default connect(null, mapDispatchToProps)(Login);