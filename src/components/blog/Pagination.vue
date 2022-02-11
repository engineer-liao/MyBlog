<template>
	<div class="ui bottom" style="text-align:center;margin-top:30px;">
		<el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" :total="total_count"
		               layout="prev, pager, next" background hide-on-single-page>
		</el-pagination>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "Pagination",
		props: {
			getBlogList: {
				type: Function,
				required: true
			},
			total_count: {  // 博客总数
				type: Number,
				required: true
			},
		},
		//目前只有首页被缓存，所以这个钩子只会被首页调用
		activated() {
			this.$nextTick(() => {
				if (!this.isBlogToHome) {
					//从其它页面路由到首页时，让首页的分页组件页码重置到第一页
					this.pageNum = 1
				}
			})
		},
		computed: {
			...mapState(['isBlogToHome', 'clientSize'])
		},
		data() {
			return {
				pageNum: 1,  	// 当前页数  
				pageSize: 5,  // 每页显示博客数（若改动需联合后端分页一起改）
			}
		},
		methods: {
			// 分页跳转位置判断
			browserRedirect() {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
					//移动端页面则直接滚动至顶部
					this.scrollToTop()
				} else {
					//pc端页面则滚动至Header下方
					window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
				}
			},

			//监听页码改变的事件
			handleCurrentChange(pageNum) {
				//如果是首页，则接着判断是移动端还是PC端
				if (this.$route.name === 'home') {
					this.browserRedirect()
				} else {
					//其它页面（分类和标签页）滚动至顶部
					this.scrollToTop()
				}
				this.pageNum = pageNum
				this.getBlogList(pageNum)
			},
		},

	}
</script>

<style>
	.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
		background-color: #ffffff !important;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #409EFF !important;
	}
</style>