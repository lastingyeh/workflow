'use client';

import axios from 'axios';
import { notification } from 'antd';
import { URL } from './const';

notification.config({
  placement: 'topLeft',
  bottom: 50,
  duration: 3,
  rtl: true,
});

axios.defaults.baseURL = URL;
