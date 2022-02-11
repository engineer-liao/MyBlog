import axios from '@/plugins/axios'

export function getBlogList(pageNum=1) {  // 不传参数，则默认显示第一页
	return axios({
		url: 'blogs',
		method: 'GET',
		params: {
			pageNum
		}
	})
}