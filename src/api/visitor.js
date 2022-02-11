import axios from '@/plugins/axios'

// 设置访客（main.js调用）
export function setVisitRecord() {
	return axios({
		url: '/visitor',
		method: 'POST'
	})
}