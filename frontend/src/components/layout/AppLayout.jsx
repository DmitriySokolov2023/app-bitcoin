import React, {useContext} from 'react';
import AppHeader from "./AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSide from "./AppSide.jsx";
import AppContent from "./AppContent.jsx";
import CryptoContext, {useCrypto} from "../../context/cripto-context.jsx";

const AppLayout = () => {
    const {loading} = useCrypto()

    if(loading){
        return <Spin fullscreen/>
    }
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSide/>
                <AppContent/>
            </Layout>
        </Layout>
    );
};

export default AppLayout;