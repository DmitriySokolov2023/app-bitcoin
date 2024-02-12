import React, {useEffect, useState} from 'react';
import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../../context/cripto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};



const AppHeader = () => {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)
    const {crypto} = useCrypto()
    const handleSelect = (value) =>{
        setCoin(crypto.find(c => c.id === value))
        setModal(true)
    }

    useEffect(() => {
        const keypress = event =>{
            if (event.key ==='/'){
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return ()=> document.removeEventListener('keypress', keypress)
    }, []);


    return (
        <>
            <Layout.Header style={headerStyle}>
                <Select
                    style={{
                        width: '23%',
                    }}
                    open={select}
                    onSelect={handleSelect}
                    onClick={()=> setSelect(prev => !prev)}
                    placeholder="select one crypto"
                    value="select one crypto"
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
                <Button
                    type="primary"
                    onClick={()=>setDrawer(true)}
                >Add Asset</Button>

                <Modal open={modal} onCancel={()=> setModal(false)} footer={null}>
                    <CoinInfoModal coin={coin}/>
                </Modal>

                <Drawer destroyOnClose width={600} title="Add asset" onClose={()=>setDrawer(false)} open={drawer}>
                    <AddAssetForm onClose={()=>setDrawer(false)}/>
                </Drawer>
            </Layout.Header>
        </>

    )
};

export default AppHeader;