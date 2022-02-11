import axios from '@/plugins/axios'

// 获取博客分类
export function getCategoryName() {
	return axios({
		url: '/category',
		method: 'GET',
	})
}

// 根据分类获取博客
export function getBlogListByCategoryName(category, pageNum=1) {
	return axios({
		url: `/category/${category}`,
		method: 'GET',
		params: {
			pageNum
		}
	})
}