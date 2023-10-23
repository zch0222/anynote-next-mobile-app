'use client'

import { AutoCenter, Card } from 'antd-mobile';
import { Typography, Input, Checkbox, Form, Button, Space } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import {RootState, wrapper} from "@/store";
import { login, loginUrl } from "@/requests/auth/auth";
import { useCookies } from "react-cookie"
// import useSWRMutation from "swr/mutation";
import {exportAppRoute} from "next/dist/export/routes/app-route";
import {GetServerSidePropsContext} from "next";
// import { setUserInfo } from "@/store/user/userSlice";
// import {useRequest} from "ahooks";
//
// const useRequest = dynamic(() => import('ahooks/lib/useRequest'), { ssr: false });
// import useRequest from 'ahooks/es/useRequest'
// const useRequest = require('ahooks/es/useRequest');

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

function Login() {
    const [setCookie] = useCookies(["user"])

    //
    // const { data, error, loading, run } = useRequest(login, {
    //     manual: true
    // })

    // const user = useSelector((state: RootState) => state.user)
    // const dispatch = useDispatch()
    //
    // console.log(user)

    const onFinish = async (value: {
        username: string,
        password: string
    }) => {
        console.log(value)
        login({
            username: value.username,
            password: value.password
        }).then(
            res => {
                console.log(res)
                setCookie("user", JSON.stringify(res.data.data), {
                    path: "/",
                    maxAge: 3600,
                    sameSite: true
                })
                // dispatch(setUserInfo(res.data.data))
            }
        ).catch(
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="h-[350px] w-[70%] max-w-[300px] p-10 bg-white flex-col rounded-lg items-center justify-center p-2.5">
                <AutoCenter>
                    <Typography.Title level={4}>
                        登录
                    </Typography.Title>
                </AutoCenter>
                <Form
                    className="w-[90%] mx-auto"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        className="mb-2 flex-col"
                        label="用户名"
                        name="username"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        className="flex-col"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

// @ts-ignore
// export const getServerSideProps = wrapper.getServerSideProps((store) => {
//     // return async function (conext: GetServerSidePropsContext) {
//     //     store.dispatch(setUserInfo({
//     //         username: "测试用户222",
//     //         nickname: "",
//     //         role: "",
//     //         avatar: "",
//     //         token: null
//     //     }))
//     //
//     //     const test = "ttt"
//     //     return {
//     //         props: {
//     //             test: test
//     //         }
//     //     }
//     // }
// })

export default Login
