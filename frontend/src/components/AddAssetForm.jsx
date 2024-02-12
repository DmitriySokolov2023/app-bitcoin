import React, {useEffect, useRef, useState} from 'react';
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
import CoinInfo from "./CoinInfo.jsx";


const AddAssetForm = ({onClose}) => {

    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [form] = Form.useForm()
    const [result, setResult] = useState(false)
    const assetRef = useRef()

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

    if(result){
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button key="buy" onClick={onClose}>Close</Button>,
                ]}
            />
        )
    }

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setResult(true)
        addAsset(newAsset)
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
                        price: +coin.price.toFixed(2),
                    }}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <CoinInfo coin={coin}/>

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
                        <InputNumber style={{width:'100%'}}  onChange={handlePriceChange} />
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
    );
};

export default AddAssetForm;