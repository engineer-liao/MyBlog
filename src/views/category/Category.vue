<template>
	<div>
		<div class="ui top segment" style="text-align: center;background: url('/img/banner.jpg');background-size:100% 150%;">
			<h2 class="category-title">{{ categoryName }} 下的文章</h2>
		</div>
		<BlogList :getBlogList="getBlogList" :blogList="blogList" :total_count="total_count"/>

		<!-- 当博客为空才显示 -->
		<div v-if="blogList.length === 0" class="notFound">
			<img src="/img/404.png" />
			<div>暂无数据</div>
		</div>
		
	</div>
</template>

<script>
	import BlogList from "@/components/blog/BlogList";
	import {getBlogListByCategoryName} from "@/api/category";

	export default {
		name: "Category",
		components: {BlogList},
		data() {
			return {
				blogList: [],
				total_count: 0
			}
		},
		watch: {
			//在当前组件被重用时，要重新获取博客列表
			'$route.fullPath'() {
				if (this.$route.name === 'category') {
					this.getBlogList(1)
				}
			}
		},
		created() {
			this.getBlogList(1)
		},
		computed: {
			categoryName() {
				return this.$route.params.name
			}
		},
		methods: {
			getBlogList(pageNum) {
				getBlogListByCategoryName(this.categoryName, pageNum).then(res => {
					this.blogList = res.results
					this.total_count = res.count
					this.$nextTick(() => {
						Prism.highlightAll()
					})
				}).catch(() => {
					this.msgError("请求失败")
				})
			}
		}
	}
</script>

<style scoped>

	.category-title {
		font-family: "Xingkai SC";
	}

	.notFound {
		text-align: center;
		margin-top: 80px;
		font-size: 16px;
		color: rgba(0,0,0,.6);
	}

	@media  screen and (max-width: 767px) {
		.notFound img{
			width: 60% !important;
		}
	}

</style>