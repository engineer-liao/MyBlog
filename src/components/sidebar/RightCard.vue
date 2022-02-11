<template>

  <div class="ui segments m-box">
		<div class="ui secondary segment"><i class="chart line icon blue"></i>网站资讯</div>
		<div class="ui yellow segment">

      <ul>

        <li>
          <span class="blog-info-icons">文章数目</span>
          <span class="badge">{{ blogNum }}篇</span>
        </li>

        <li>
          <span class="blog-info-icons" style="width: 100%">访问总数</span>
          <span class="badge">{{ pv }}次</span>
        </li>

        <li style="margin-bottom:-10px!important">
          <span class="blog-info-icons">陪伴时长</span>
          <span class="badge" id="showsectime"></span>
        </li>

      </ul>

    </div>
    
	</div>

</template>

<script>


export default {
  name: "RightCard",
  data() {
    return {
      
    }
  },
  methods: {
    getRunTime(){
        // 初始时间，日/月/年 时:分:秒（修改此处时间即可）
        let X = new Date("1/26/2022 20:00:00");
        let Y = new Date();
        let T = (Y.getTime()-X.getTime());
        let M = 24*60*60*1000;
        let a = T/M;
        let A = Math.floor(a);
        let b = (a-A)*24;
        let B = Math.floor(b);
        let c = (b-B)*60;
        let C = Math.floor((b-B)*60);
        let D = Math.floor((c-C)*60);
        //信息写入到DIV中
        document.getElementById("showsectime").innerHTML = A + "天" + B + "时" + C + "分" + D + "秒"
    }
    
  },
  mounted() {
    setInterval(this.getRunTime, 1000)
  },
  props: {
    blogNum: {
      type: Number,
      required: true
		},
    pv: {
      type: Number,
      required: true
    }
  }

}
</script>

<style scoped>

ul,li{
  list-style: none;
  color: rgba(0,0,0,.6);
  margin-top: 0px;
  padding: 0px;
  margin-bottom: 10px;
}

.badge{
  float: right;
  width: 150px;
  /* border-radius: 2rem; */
  text-align: right;
  /* color: black; */
}
</style>