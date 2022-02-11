<template>
	<div>       
		<div class="ui padded attached segment m-padded-tb-large m-box" v-for="item in blogList" :key="item.id">
			<div class="ui mobile reversed stackable grid">
				<!--  文章标题 -->
				<div class="eleven wide column">
					<h3 class="ui header">
						<a href="javascript:;" @click.prevent="toBlog(item)" class="m-black">{{ item.title }}</a>
						<span><i class="el-icon-warning" style="color:red;margin-left:5px;" v-if="!item.status"></i></span>
					</h3>
					<!--文章Markdown描述-->
					<p class="m-text font-set p-three-rows">{{ item.description }}</p>
					<div class="ui stackable grid">
						<div class="row">
							<div class="eleven wide column">
								<div class="ui mini horizontal link list">
									<!-- 小图标 -->
									<div class="item">
                    <img :src="$store.state.introduction.avatar" alt="" class="ui avatar image">
                    <div class="content"><a href="#" class="header">{{ $store.state.introduction.name }}</a></div>
                  </div>

									<div class="item">
										<i class="calendar icon"></i>
										{{ item.create_time | dateFormat('YYYY-MM-DD')}}
									</div>

									<div class="item">
										<i class="eye icon"></i>
										{{ item.views }}次观看
									</div>
									
								</div>
							</div>
							<!-- 底部俩大图标 -->
							<div class="right aligned five wide column">
								<router-link :to="`/category/${item.category}`">
									<a href="javascript:" class="teal basic label m-padded-tiny color-btn" style="margin-right:5px">{{ item.category }}</a>
								</router-link>
								<a href="javascript:" @click.prevent="toBlog(item)" class="teal basic label m-padded-tiny color-btn">阅读全文</a>
							</div>
							
						</div>
					</div>
				</div>
				<!-- 文章图片 -->
				<div class="five wide column">
					<img :src="item.first_picture" alt="" class="ui rounded image">
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	export default {
		name: "BlogItem",
		props: {
			blogList: {
				type: Array,
				required: true
			}
		},
		methods: {
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
	.image {
		width: 100%;
		height: auto;
	}

	/* 自定义文章描述样式 */
	.font-set {
		line-height: 1.8 !important;
		letter-spacing: 1px !important;
		font-weight: 300 !important;
		color: #333333 !important
	}

	/* 自定义文章描述样式 */
	.p-three-rows {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

</style>

