import {
	SAVE_COMMENT_RESULT,
	SET_PARENT_COMMENT_ID,
	RESET_COMMENT_FORM,
} from "./mutations-types";

import {checkBlogPassword} from '@/api/blog'
import {getCommentListByQuery, submitComment} from "@/api/comment";
import {Message, Notification, MessageBox } from "element-ui";
import router from "../router";
import tvMapper from '@/plugins/tvMapper.json'
import aruMapper from '@/plugins/aruMapper.json'
import paopaoMapper from '@/plugins/paopaoMapper.json'
import sanitizeHtml from 'sanitize-html'

export default {
	getCommentList({commit, rootState}) {

		//如果有则发送博主身份Token
		const adminToken = window.localStorage.getItem('adminToken')
		const token = adminToken ? adminToken : ''

		function replaceEmoji(comment, emoji) {
			comment.content = comment.content.replace(new RegExp(emoji.reg, 'g'), `<img src="${emoji.src}">`)
		}

		function convertEmoji(comment) {
			tvMapper.forEach(emoji => {
				replaceEmoji(comment, emoji)
			})
			aruMapper.forEach(emoji => {
				replaceEmoji(comment, emoji)
			})
			paopaoMapper.forEach(emoji => {
				replaceEmoji(comment, emoji)
			})
		}

		// 获取评论列表
		getCommentListByQuery(token, rootState.commentQuery).then(res => {
			if (res.code === 200) {
				let sanitizeHtmlConfig = {
					allowedTags: [],
					allowedAttributes: false,
					disallowedTagsMode: 'recursiveEscape'
				}
				res.data.comments.forEach(comment => {
					//转义评论中的html
					comment.content = sanitizeHtml(comment.content, sanitizeHtmlConfig)
					//查找评论中是否有表情
					if (comment.content.indexOf('@[') != -1) {
						convertEmoji(comment)
					}
					comment.sub_comments.forEach(comment => {
						//转义评论中的html
						comment.content = sanitizeHtml(comment.content, sanitizeHtmlConfig)
						//查找评论中是否有表情
						if (comment.content.indexOf('@[') != -1) {
							convertEmoji(comment)
						}
					})
				})
				commit(SAVE_COMMENT_RESULT, res.data)
			}
		}).catch((err) => {
			Message.error("请求失败")
		})
	},
	submitCommentForm({rootState, dispatch, commit}, token) {
		let form = {...rootState.commentForm}
		form.page = rootState.commentQuery.page
		form.blog = rootState.commentQuery.blogId
		form.parent_comment = rootState.parentCommentId
		submitComment(token, form).then(res => {
			Notification({
				title: '评论成功！',
				type: 'success'
			})
			commit(SET_PARENT_COMMENT_ID, null)
			commit(RESET_COMMENT_FORM)
			dispatch('getCommentList')
		}).catch((err) => {
			Notification({
				title: '评论失败',
				message: err.response.data.detail,
				type: 'error'
			})
		})
	},
	
	// 点击阅读全文则执行该函数
	goBlogPage({commit}, blog) {
		const adminToken = window.localStorage.getItem('adminToken') ? window.localStorage.getItem('adminToken') : ''
		if (blog.status) {
			router.push(`/blog/${blog.id}`)
		}
		// 有博主身份可以浏览所有博客（包括加密的博客）
		else if(adminToken) {
			router.push(`/blog/${blog.id}`)
		}
		else {
			MessageBox.prompt('已加密，请输入密码：', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^\w{0,15}$/,
				inputErrorMessage: '请输入非空数字或字母，最长15位'
			}).then(({value}) => {
				let dict = {
					'id': blog.id,
					'password': value
				}
				// 验证密码
				checkBlogPassword(dict).then(res => {
					Message.success('密码正确')
					router.push(`/blog/${blog.id}`)
				}).catch(() => {
					Message.error('密码错误')
					return
				})
			}).catch(() => {
				Message.info('取消输入')
			})
		}
	}
}
