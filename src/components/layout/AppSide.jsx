import React, {useEffect, useState} from 'react';
import {Card, Layout, List, Spin, Statistic, Tag, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {fakeAssets, fakeFetchCrypto} from "../../api.js";
import {percentDifference} from "../../utils.js";

const sideStyle = {
    padding: '1rem'
};


const AppSide = () => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assetsData = await fakeAssets()
            setAssets(assetsData.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false)
        }

        preload()

    }, []);

    return (
        <>
            {loading
                ?
                <Spin spinning={loading} fullscreen/>
                :
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
            }


        </>

    );
};

export default AppSide;