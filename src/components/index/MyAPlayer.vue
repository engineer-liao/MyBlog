<template>
	<!-- type：artist歌手、album专辑、song单曲、playlist歌单、search搜索-->
	<meting-js server="netease" type="artist" id="6472" fixed="true" theme="#25CCF7"></meting-js>
</template>

<script>
	export default {
		name: "MyAPlayer"
	}
</script>

<style>
	/* 播放器隐藏侧边栏 */
	.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body{
  	left: -66px !important;
 	}
 	.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body:hover{
    left: 0px !important;
 	}
</style>