import axios from '@/plugins/axios'

// 获取名言
export function getHitokoto() {
	return axios({
		url: 'https://v1.hitokoto.cn/?c=a',
		method: 'GET'
	})
}

// 获取网站基础信息
export function getSite() {
	return axios({
		url: '/siteinfo',
		method: 'GET'
	})
}

