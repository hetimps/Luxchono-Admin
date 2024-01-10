import { Grid} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { DashboardItem } from '../../constants/Array';
import './style.scss';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart, ArcElement, registerables } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Tables from '../common/Table';
import { STRING } from '../../constants/String';
Chart.register(...registerables);
Chart.register(ArcElement);
Chart.register(CategoryScale);

export default function DashboardPage() {
    const [dashboardItem, setDashboardItem] = useState<any>([]);
    useEffect(() => {
        setDashboardItem(DashboardItem());
    }, []);

    const pieChartData = {
        labels: ['Group A', 'Group B', 'Group C', 'Group D'],
        datasets: [
            {
                data: [400, 300, 300, 200],
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
            },
        ],
    };

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'User Activity',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const headCells: any[] = [
        {
            id: 'productname',
            numeric: false,
            disablePadding: true,
            label: 'Product name',
        },
        {
            id: 'category',
            numeric: true,
            disablePadding: false,
            label: 'Category',
        },
        {
            id: 'brand',
            numeric: true,
            disablePadding: false,
            label: 'Brand',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'stock',
            numeric: true,
            disablePadding: false,
            label: 'Stock',
        },
        {
            id: 'productModel',
            numeric: false,
            disablePadding: false,
            label: 'Model',
        },
        {
            id: 'warranty',
            numeric: false,
            disablePadding: false,
            label: 'Warranty',
        },
        {
            id: 'dummyPrice',
            numeric: false,
            disablePadding: false,
            label: 'Dummy Price',
        },
    ];
    return (
        <>
            <div className='mt-[1rem]'>
                <Grid container spacing={2}>
                    {dashboardItem.map((item: any,index:number) => {
                        if (item?.data && item?.data > 0) {
                            return (
                                <Grid key={index} item xs={12} lg={3} md={6} sm={6}  >
                                    <Box className="border !w-[18vw] !h-[9vh] flex items-center p-[1.5rem] paperboxshadow rounded-[12px] gap-[10px] dashboarditem">
                                        <div className='bg-main  p-[0.3rem] rounded-[12px]'>
                                            <item.Icon className='!text-[25px] text-white' />
                                        </div>

                                        <div className='flex  flex-col'>
                                            <span className='text-light font-bold text-[14px]'>{item?.title}</span>
                                            <span className='text-black  text-[16px]'>{item?.data}</span>
                                        </div>

                                    </Box>
                                </Grid>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Grid>
            </div>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={9} md={12} sm={12}  >
                        <div className=' h-[400px] mt-[1rem] paperboxshadow rounded-[12px] p-[1rem] flex '>
                            <div className='w-[25%] border-r-2'>
                                <h1 className='!text-[20px]'>Overview</h1>
                            </div>
                            <ResponsiveContainer width="75%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={3} md={12} sm={12}  >
                        <div className='paperboxshadow rounded-[12px] !h-[400px] mt-[1rem] p-[1rem]  !flex flex-col'>
                            <div className='!flex !justify-start'>
                                <h1 className='!text-[20px]'>Order Status</h1>
                            </div>
                            <div className="pie-chart-container !flex !items-center !justify-center border-b-2 p-[0.5rem]">
                                <Pie
                                    data={pieChartData} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={3}>

                    <Grid item xs={12} lg={4} md={12} sm={12}  >
                        <div className='paperboxshadow rounded-[12px] !h-[340px] mt-[1rem] p-[1rem]  !flex flex-col'>
                            <div className='!flex !justify-start'>
                                <h1 className='!text-[20px]'>{STRING.USER_ACTIVITY}</h1>
                            </div>
                            <div className=" !flex !items-center !justify-center">
                                <Line data={lineChartData} />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} lg={4} md={12} sm={12}  >
                        <div className='paperboxshadow rounded-[12px] !h-[340px] mt-[1rem] p-[1rem]  !flex flex-col'>
                            <div className='!flex !justify-start'>
                                <h1 className='!text-[20px]'>{STRING.TOP_PRODUCT}</h1>
                            </div>

                        </div>
                    </Grid>

                    <Grid item xs={12} lg={4} md={12} sm={12}  >
                        <div className='paperboxshadow rounded-[12px] !h-[340px] mt-[1rem] p-[1rem]  !flex flex-col'>
                            <div className='!flex !justify-start'>
                                <h1 className='!text-[20px]'>{STRING.DASHBOARD_ORDER_STATUS}</h1>
                            </div>
                            <div className="pie-chart-container !flex !items-center !justify-center  p-[0.5rem]">
                                <Pie
                                    data={pieChartData} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container >
                    <Grid item xs={12} lg={12} md={12} sm={12}  >
                        <div className='!flex !justify-start mt-[1rem]'>
                            <h1 className='!text-[20px]'>{STRING.LATEST_ORDERS}</h1>
                        </div>
                        <div className='mt-[0.3rem]'>
                            <Tables DashboardProduct={'DashboardProduct'} headCells={headCells} rows={[]} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
