import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.scss'  
//导入antd
import 'antd/dist/antd.min.css'


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)