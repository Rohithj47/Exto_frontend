import React from 'react';
import { Avatar, Card } from 'antd';

function CardComponent(props) {
    return (
        <div className="site-card-wrapper">
            <Card hoverable
                style={{
                width: 300,
                }}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={[]}>
                {props.data}
            </Card>
        </div>
    );
}

export default CardComponent;