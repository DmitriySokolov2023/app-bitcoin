import React from 'react';
import {Layout, Typography} from "antd";
import {useCrypto} from "../../context/cripto-context.jsx";
import {totalBalance} from "../../utils.js";
import PortfolioChart from "../PortfolioChart.jsx";
import AssetsTable from "../AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding:'1rem',
    color: '#fff',
    backgroundColor: '#001529',
};
const AppContent = () => {
    const {assets} = useCrypto()

    return <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{color:'#fff', textAlign:'left'} }>Portfolio: <span style={{color:'green'}}>{assets && totalBalance(assets)}</span> $</Typography.Title>
        <PortfolioChart assets={assets}/>
        <AssetsTable/>
    </Layout.Content>
};

export default AppContent;