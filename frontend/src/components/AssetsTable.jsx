import React from 'react';
import {Table} from "antd";
import {useCrypto} from "../context/cripto-context.jsx";
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: 'Price $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
];



const AssetsTable = () => {
    const {assets} = useCrypto()
    const data = assets.map(asset => ({
        key:asset.id,
        name:asset.id,
        price:asset.price,
        amount:asset.amount
    }))
    return (
        <div>
            <Table columns={columns} dataSource={data}  pagination={false}/>
        </div>
    );
};

export default AssetsTable;