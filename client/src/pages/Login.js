import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
// import AOS from 'aos';
// import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import loginimg from '../images/desert-car2.jpg'
import './Login.css'


// AOS.init();
function Login() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)

    }
    return (
        <div className='login'>
            {/* {loading && (<Spinner />)} */}
            {/* <Row gutter={16} className='d-flex align-items-center' > */}
            {/* <h1 className="login-logo">WanderWheels</h1> */}
            <div>

                {/* <Col lg={16} style={{position: 'relative'}}> */}
                <img className='bgimg' alt=''/>
                <div>

                    {/* <Col lg={8} className='text-left p-5'> */}
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr />
                        <label htmlFor="username" className="fontSize">Username</label>
                        <Form.Item name='username' label='' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <label htmlFor="password" className="fontSize">Password</label>
                        <Form.Item name='password' label='' rules={[{ required: true }]}>
                            <Input type='password' />
                        </Form.Item>

                        <button className='btn-lg mt-2 btn btn-outline-success' style={{ width: 90, borderWidth: 2 }}>Login</button>

                        <hr />

                        <Link to='/register'>Click Here to Register</Link>


                    </Form>
                </div>


            </div>
            {/* <div>

                {/* <Col lg={8} className='text-lef t p-5'>  
                <Form layout='vertical' className='login-form p-5 logp' onFinish={onFinish}>
                    <h1>Login</h1>
                    <hr />
                    <label for="username" className="fontSize">Username</label>
                    <Form.Item name='username' label='' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <label for="password" className="fontSize">Password</label>
                    <Form.Item name='password' label='' rules={[{ required: true }]}>
                        <Input type='password' />
                    </Form.Item>

                    <button className='btn-lg mt-2 btn btn-outline-success' style={{ width: 90, borderWidth: 2 }}>Login</button>

                    <hr />

                    <Link to='/register'>Click Here to Register</Link>


                </Form>
            </div> */}

            {/* </Row> */}

        </div>
    )
}

export default Login