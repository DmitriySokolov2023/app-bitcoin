import {Layout} from 'antd';
import AppHeader from "./components/layout/AppHeader.jsx";
import React from "react";
import AppSide from "./components/layout/AppSide.jsx";
import AppContent from "./components/layout/AppContent.jsx";


export default function App() {
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSide/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}
