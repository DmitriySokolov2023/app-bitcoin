import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Flex,
    Form,
    Input,
    InputNumber,
    Result,
    Select,
    Space,
    Typography
} from "antd";
import {useCrypto} from "../context/cripto-context.jsx";


const AddAssetForm = ({onClose}) => {

    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [form] = Form.useForm()
    const [result, setResult] = useState(false)

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

    const onFinish = (values) => {
        setResult(true)
    }

    const handleAmountChange = (v) =>{
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total:(v * price).toFixed(2),
        })
    }

    const handlePriceChange = (v) =>{
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total:(v * amount).toFixed(2),
        })
    }

    const validateMessages = {
        required: "${label} is required!",
        types:{
            number:"${label} is not valid number!"
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    };


    return (
        <div>
            {result
                ?
                <Result
                    status="success"
                    title="New Asset Added"
                    subTitle={`Added ${42} of ${coin.name} by price ${24}`}
                    extra={[
                        <Button key="buy" onClick={onClose}>Close</Button>,
                    ]}
                />
                :
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        price: +coin.price.toFixed(2)
                    }}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Flex align={"center"}>
                        <img src={coin.icon} alt={coin.name} style={{width: '40px', marginRight: '10px'}}/>
                        <Typography.Title level={2} style={{margin: '0'}}>{coin.name}</Typography.Title>
                    </Flex>
                    <Divider></Divider>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        plaseholder='Enter coin amount'
                        rules={[
                            {
                                required: true,
                                type:"number",
                                min:0,
                            },
                        ]}
                    >
                        <InputNumber style={{width:'100%'}} onChange={handleAmountChange}/>
                    </Form.Item>

                    <Form.Item label="Price" name="price" >
                        <InputNumber style={{width:'100%'}}  onChange={handlePriceChange}/>
                    </Form.Item>

                    <Form.Item label="Date & Time" name="date" >
                        <DatePicker showTime  />
                    </Form.Item>


                    <Form.Item label="Total" name="total">
                        <InputNumber style={{width:'100%'}}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Asset
                        </Button>
                    </Form.Item>
                </Form>
            }
        </div>
    );
};

export default AddAssetForm;