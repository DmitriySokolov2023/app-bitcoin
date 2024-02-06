import React, {useState} from 'react';
import {Button, Checkbox, Divider, Flex, Form, Input, Select, Space, Typography} from "antd";
import {useCrypto} from "../context/cripto-context.jsx";

const AddAssetForm = () => {
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null)
    if(!coin){
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={v => setCoin(crypto.find(c => c.id === v))}
                placeholder="Select coin"
                value="Select coin"
                optionLabelProp="label"
                options={crypto.map(coin => ({
                    label:coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width:'20px'}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
        )
    }
    return (
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Flex align={"center"}>
                    <img src={coin.icon} alt={coin.name} style={{width: '40px', marginRight: '10px'}}/>
                    <Typography.Title level={2} style={{margin: '0'}}>{coin.name}</Typography.Title>
                </Flex>
                <Divider></Divider>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
    );
};

export default AddAssetForm;