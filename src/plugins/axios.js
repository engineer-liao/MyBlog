import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
	baseURL: 'http://127.0.0.1:8000',
	timeout: 20000,
})

// 请求拦截（添加进度条特效）
request.interceptors.request.use(
	config => {
		NProgress.start()
		return config
	}
)

// 响应拦截（添加进度条特效，同时只返回config内的data信息）
request.interceptors.response.use(
	config => {
		NProgress.done()
		return config.data
	}
)

export default request