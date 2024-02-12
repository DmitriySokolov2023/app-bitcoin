import React, {useContext, useEffect, useState} from 'react';
import {Card, Layout, List, Spin, Statistic, Tag, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {fakeAssets, fakeFetchCrypto} from "../../api.js";
import {percentDifference} from "../../utils.js";
import CryptoContext from "../../context/cripto-context.jsx";

const sideStyle = {
    padding: '1rem'
};


const AppSide = () => {
    const {loading, assets, crypto}  = useContext(CryptoContext)
    console.log(assets)

    return (
        <>
            <Spin spinning={loading} fullscreen/>
                <Layout.Sider width="25%" style={sideStyle}>
                    {assets.map((asset) => (
                        <Card style={{marginBottom: '1rem'}} key={asset.id}>
                            <Statistic
                                title={(asset.id).toUpperCase()}
                                value={asset.totalAmount}
                                precision={2}
                                valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                                prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                                suffix="$"
                            />
                            <List
                                size={'small'}
                                dataSource={[
                                    {title: 'Total Profit', value: asset.totalProfit, isPlain:false, withTag:true},
                                    {title: 'Asset Amount', value: asset.amount, isPlain: true},
                                    // {title: 'Difference ', value: asset.growPercent, isPlain:false},
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <span>{item.title}</span>
                                        {item.withTag && <Tag color={asset.grow ? 'green':'red'}>{asset.growPercent} %</Tag>}
                                        {item.isPlain && <span>{item.value}</span>}
                                        {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{(+item.value).toFixed(2)} $</Typography.Text>}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    ))}
                </Layout.Sider>
        </>

    );
};

export default AppSide;