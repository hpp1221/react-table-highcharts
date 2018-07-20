import React, {Component} from 'react';
import {Table} from 'antd';
import './App.css';

let ReactHighcharts = require('react-highcharts');
let Highcharts = require('highcharts');
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        };
        this.getDataSource = this.getDataSource.bind(this);
    }
    componentWillMount() {
        this.getDataSource();
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
    getDataSource(){
        fetch(`http://192.168.10.34:3000/statsdata`)
            .then((res) => (res.json()))
            .then((res) => {
                console.log('res',res);
                this.setState({
                    dataSource: res
                });
            });

    }
    render() {
        const dataSource = this.state.dataSource;
        dataSource.map((value,arr)=>{
            let node = value.distribution.node;
            let val = value.distribution.value;
            node = ['',...node];
            val = [0,...val,0];
            value.distribution.series = [{
                name:value.propertyName,
                data:val,
                color:'#639d63'
            }];
            delete value.distribution.value;
            value.distribution.xAxis = {
                categories:node
            };
            delete value.distribution.node;
            return arr;
        });
        const columns = [
            {
                title: '属性',
                dataIndex: 'propertyName',
                key: 'propertyName',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '缺失值个数',
                dataIndex: 'lossCount',
                key: 'lossCount',
            },
            {
                title: '分布图',
                dataIndex: 'distribution',
                key: 'distribution',
                render: (text, record) => {
                    console.log('record-----',record);
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
                dataIndex: 'min',
                key: 'min',
            }, {
                title: '最大/最多',
                dataIndex: 'max',
                key: 'max',
            },
            {
                title: '标准差/数量占比',
                dataIndex: 'standardValue',
                key: 'standardValue',
            }
        ];
        return (
            <div className="App">
                <Table dataSource={dataSource} columns={columns}  rowKey={record => record.propertyName}/>
            </div>
        );
    }
}

export default App;
