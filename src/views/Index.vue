<template>
	<div class="site">
		<!--顶部导航-->
		<Nav :blogName="siteInfo.blogName" :categoryList="categoryList"/>
		<!--首页大图 只在首页且pc端时显示-->
		<div class="m-mobile-hide">
			<Header v-if="$route.name==='home'"/>
		</div>

		<div class="main">
			<div class="m-padded-tb-big">
				<div class="ui container">
					<div class="ui stackable grid">
						<!--左侧-->
						<div class="three wide column m-mobile-hide">
							<Introduction :class="{'m-display-none':focusMode}"/>
						</div>
						<!--中间-->
						<div class="ten wide column">
							<!-- 首页缓存 -->
							<keep-alive include="Home">
								<router-view/>
							</keep-alive>
						</div>
						<!--右侧-->
						<div class="three wide column m-mobile-hide">
							<!-- class="{'m-display-none':focusMode}"  专注模式下该组件不显示-->
							<RandomBlog :randomBlogList="randomBlogList" :class="{'m-display-none':focusMode}"/>
							<RightCard :class="{'m-display-none':focusMode}" :blogNum="blogNum" :pv="siteInfo.pv" />
							<!-- <Tags :tagList="tagList" :class="{'m-display-none':focusMode}"/> -->
							<!--只在文章页面显示目录-->
							<Tocbot v-if="$route.name==='blog'"/>

						</div>
					</div>
				</div>
			</div>
		</div>

		<!--APlayer-->
		<div class="m-mobile-hide">
			<MyAPlayer/>
		</div>
		<!--回到顶部-->
		<el-backtop style="box-shadow: none;background: none;">
			<img src="/img/paper-plane.png" style="width: 40px;height: 40px;">
		</el-backtop>
		<!--底部footer-->
		<Footer :siteInfo="siteInfo"  :newBlogList="newBlogList" :hitokoto="hitokoto"/>
	</div>
</template>

<script>
	import {getHitokoto, getSite} from '@/api/index'
	import {getCategoryName} from '@/api/category'

	import Nav from "@/components/index/Nav";
	import Header from "@/components/index/Header";
	import Footer from "@/components/index/Footer";
	import Introduction from "@/components/sidebar/Introduction";
	import RightCard from "@/components/sidebar/RightCard";
	import RandomBlog from "@/components/sidebar/RandomBlog";
	import Tocbot from "@/components/sidebar/Tocbot";
	import MyAPlayer from "@/components/index/MyAPlayer";

	import {mapState} from 'vuex'
	
	import {SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, SAVE_SITE_INFO, RESTORE_COMMENT_FORM} from "@/store/mutations-types";


	export default {
		name: "Index",
		components: {Header, MyAPlayer, RightCard, Nav, Footer, Introduction, RandomBlog, Tocbot},
		data() {
			return {
				siteInfo: {
					blogName: "",  		 // 导航栏显示的名字
					pv: 0							 // 右侧侧边栏pv访客（用于值初始化绑定，否则报错但不影响）
				},
				hitokoto: {},  			 // 名言名句
				categoryList: [],    // 分类
				newBlogList: [],     // 页脚显示最新博客（传给子组件）
				randomBlogList: [],  // 随机博客（传给子组件）
				blogNum: 0,          // 博客总数（用于传给子组件）
			}
		},
		computed: {
			...mapState(['focusMode'])
		},
		watch: {
			//路由改变时，页面滚动至顶部
			'$route.path'() {
				this.scrollToTop()
			}
		},
		created() {
			this.getCategoryName()
			this.getHitokoto()
			this.getSite()

			//从localStorage恢复之前的评论信息
			this.$store.commit(RESTORE_COMMENT_FORM)
		},
		mounted() {
			//保存可视窗口大小
			this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			window.onresize = () => {
				this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
			}
		},
		methods: {
			// 获取分类
			getCategoryName() {
				getCategoryName().then(res => {
					this.categoryList = res
				})
			},

			// 获取页脚名言
			getHitokoto() {
				getHitokoto().then(res => {
					this.hitokoto = res
				})
			},

			// 获取站点基本信息
			getSite() {
				getSite().then(res => {
					if (res.code === 200) {
						this.siteInfo = res.data.siteInfo
						this.newBlogList = res.data.newBlogList.slice(0,3)  // 截取前三篇博客作为最新博客
						this.randomBlogList = res.data.randomBlogList
						this.blogNum = res.data.newBlogList.length
						let rollText = res.data.introduction.rollText.split('；')  // 将字符串转为数组再存储
						res.data.introduction.rollText = rollText
						this.$store.commit(SAVE_SITE_INFO, this.siteInfo)
						this.$store.commit(SAVE_INTRODUCTION, res.data.introduction)
						document.title = this.$route.meta.title + this.siteInfo.webTitleSuffix
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},

		}
	
	}
</script>

<style scoped>
	.site {
		display: flex;
		min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
		flex-direction: column;

		/* 彩色背景 */
		/* background:linear-gradient(90deg,rgba(247,149,51,.1) 0,rgba(243,112,85,.1) 15%,rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,rgba(7,179,155,.1) 86%,rgba(109,186,130,.1) 100%); */
	}

	.main {
		margin-top: 40px;
		flex: 1;
	}

	.main .ui.container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.ui.grid .three.column {
		padding: 0;
	}

	.ui.grid .ten.column {
		padding-top: 0;
	}

	.m-display-none {
		display: none !important;
	}

	.main {
		
	}

</style>