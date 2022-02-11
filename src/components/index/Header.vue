<template>
	<header ref="header">
		<div class="view">
			<div class="bg1" :style="{'background-image':'url(' + url + ')'}"></div>
		</div>

		<div class="text-mal">
			<p style="margin-bottom:0px;">愿你历尽千帆，归来仍似少年!</p>
			<p>Welcome To My Home</p>
		</div>

		<!-- 下滑至正文部分的图标 -->
		<div class="wrapper">
			<i class="angle down icon" @click="scrollToMain" style="color:white;"></i>
		</div>
		
	</header>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "Header",
		data() {
			return {
				loaded: false,
				url: "https://cdn.jsdelivr.net/gh/engineer-liao/picture/blog_img/bg1.jpeg"
			}
		},
		computed: {
			...mapState(['clientSize', 'siteInfo'])
		},
		watch: {
			'clientSize.clientHeight'() {
				this.setHeaderHeight()
			}
		},
		mounted() {
			this.setHeaderHeight()
		},
		methods: {
			//根据可视窗口高度，动态改变首图大小
			setHeaderHeight() {
				this.$refs.header.style.height = this.clientSize.clientHeight + 'px'
			},
			//平滑滚动至正文部分
			scrollToMain() {
				window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
			}
		},
	}
</script>

<style scoped>
	header {
		--percentage: 0.5;
		user-select: none;
	}

	.view {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		transform: translatex(calc(var(--percentage) * 100px));
	}

	.view div {
		background-position: center center;
		background-size: cover;
		position: absolute;
		width: 110%;
		height: 100%;
	}

	.text-mal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(2.5);
		font-family: "Xingkai SC";
		color: white;
		font-size: 15px;
		font-weight: bold;
		text-align: center;	
	}

	.wrapper {
		position: absolute;
		width: 100px;
		bottom: 150px;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 26px;
		z-index: 100;
	}

	.wrapper i {
		font-size: 60px;
		opacity: 0.5;
		cursor: pointer;
		position: absolute;
		top: 55px;
		left: 20px;
		animation: opener .5s ease-in-out alternate infinite;
		transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
	}

	.wrapper i:hover {
		opacity: 1;
	}

	@keyframes opener {
		100% {
			top: 65px
		}
	}
	
</style>


