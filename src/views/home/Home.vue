<template>
	<div>
		<BlogList :getBlogList="getBlogList" :blogList="blogList" :total_count="total_count"/>
	</div>
</template>

<script>
	import BlogList from "@/components/blog/BlogList";
	import {getBlogList} from "@/api/home";
	import {SET_IS_BLOG_TO_HOME} from "../../store/mutations-types";

	export default {
		name: "Home",
		components: {BlogList},
		data() {
			return {
				blogList: [], 
				total_count: 0,   // 博客总数（此处传给子组件进行赋值）
				getBlogListFinish: false
			}
		},

		beforeRouteEnter(to, from, next) {
			// 该守卫不能获取实例this，但使用vm可获取
			next(vm => {
				if (from.name !== 'blog') {
					//其它页面跳转到首页时，重新请求数据
					//设置一个flag，让首页的分页组件指向正确的页码
					vm.$store.commit(SET_IS_BLOG_TO_HOME, false)
					vm.getBlogList(1)
				} else {
					//如果文章页面是起始访问页，首页将是第一次进入，即缓存不存在，要请求数据
					if (!vm.getBlogListFinish) {
						vm.getBlogList(1)
					}
					//从文章页面跳转到首页时，使用首页缓存
					vm.$store.commit(SET_IS_BLOG_TO_HOME, true)
				}
			})
		},

		created() {
			this.getBlogList(1) // 默认获取第一页数据，每页显示两条（若修改还需改pagination.vue内的本函数。以及Category.vue内的该函数）
		},

		methods: {
			// 获取所有博客数据
			getBlogList(pageNum) {
				getBlogList(pageNum).then(res => {

					this.blogList = res.results
					this.total_count = res.count
					this.$nextTick(() => {
						Prism.highlightAll()
					})
					this.getBlogListFinish = true
				}).catch(() => {
					this.msgError("请求失败")
				})
			}
		}
	}
</script>

<style scoped>

</style>