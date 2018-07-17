import React, {Component} from 'react';
import {Table} from 'antd';
import './App.css';

let ReactHighcharts = require('react-highcharts');
let Highcharts = require('highcharts');

const dataSource = [{
    key: '1',
    attribute: 'MYCT',
    type: '数值型(INT)',
    missValue: '0',
    distribution: {
        xAxis: {
            categories: ['', '17.00', '165.30', '313.60', '461.90', '610.20', '758.50', '906.80']
        },
        series: [
            {
                name: 'yyy0',
                data: [0, 140, 30, 15, 2, 1, 10, 0],
                color: '#639d63',
            }
        ],
    },
    mixOrLeast: '17',
    maxOrMost: '1500',
    standardDeviation: '260.2629'
}, {
    key: '2',
    attribute: 'MMIN',
    type: '数值型(INT)',
    missValue: '0',
    distribution: {
        xAxis: {
            categories: ['', '6.4e+1', '3.3e+3', '5.5e+3', '9.6e+3', '0.6e+4', '3.2e+4']
        },
        series: [{
            name: 'yyy1',
            data: [0, 140, 30, 15, 2, 0, 0],
            color: '#639d63',
        }]
    },
    mixOrLeast: '64',
    maxOrMost: '32000',
    standardDeviation: '3878.7428'
}];

const columns = [
    {
        title: '属性',
        dataIndex: 'attribute',
        key: 'attribute',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '缺失值个数',
        dataIndex: 'missValue',
        key: 'missValue',
    },
    {
        title: '分布图',
        dataIndex: 'distribution',
        key: 'distribution',
        render: (text, record) => {
            console.log('text', text);
            console.log('record', record);
            return (
                <div>
                    <ReactHighcharts config={record.distribution}>
                    </ReactHighcharts>
                </div>
            )
        }
    },
    {
        title: '最小/最少',
        dataIndex: 'mixOrLeast',
        key: 'mixOrLeast',
    }, {
        title: '最大/最多',
        dataIndex: 'maxOrMost',
        key: 'maxOrMost',
    },
    {
        title: '标准差/数量占比',
        dataIndex: 'standardDeviation',
        key: 'standardDeviation',
    }
];

class App extends Component {
    componentWillMount() {
        Highcharts.theme = {
            chart: {
                type: 'column',
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false,
            },
            xAxis: {

                type: 'category',
                tickLength: 6,
                tickColor: '#999',
                lineColor: '#999',
                labels: {
                    rotation: -45,// 设置轴标签旋转角度
                    x: -25
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                lineColor: '#999',
                title: {
                    text: ''
                },
                gridLineWidth: 0,
                tickLength: 6,
                tickColor: '#999',
                tickWidth: 1
            },
        };
        Highcharts.setOptions(Highcharts.theme);
    }

    render() {
        return (
            <div className="App">
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        );
    }
}

export default App;
