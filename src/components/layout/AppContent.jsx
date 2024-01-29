import React from 'react';
import {Layout} from "antd";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding:'1rem',
    color: '#fff',
    backgroundColor: '#001529',
};
const AppContent = () => {
    return <Layout.Content style={contentStyle}>Content</Layout.Content>
};

export default AppContent;