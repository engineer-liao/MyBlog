import axios from '@/plugins/axios'

export function getBlogById(token, id) {
	return axios({
		url: `/blogs/${id}`,
		method: 'GET',
		headers: {
			Authorization: token,
		},
	})
}

export function checkBlogPassword(blogPasswordForm) {
	return axios({
		url: '/blogs/checkBlogPassword',
		method: 'POST',
		data: {
			...blogPasswordForm
		}
	})
}

export function getSearchBlogList(search) {
	return axios({
		url: '/blogs/searchBlog',
		method: 'GET',
		params: {
			search
		}
	})
}


