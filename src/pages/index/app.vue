<template>
  <div class="content">
    <p class="testp">啦啦啦啦啦{{msg}}</p>
    <h2>biaosdsof啥电费卡是否</h2>
    <div class="bgimg"></div>
    <div class="bgimg2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '水电费违法玩儿'
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
.testp{
  font-size: 18px; /*px*/ /*no*/
  font-weight: 700;
  color: #f01414;
  background-color: aquamarine;
  width: 90vw;
  height: 20vw;
}
h2{
  font-size: 20px;
}
.bgimg {
  width: 7.5rem; /*no*/
  height: 1rem; /*rem*/
  background-color: aquamarine;
  // margin: 20px;
  background-image: url('../../assets/imgs/logo.png');
  // border: 1px solid #1a0af7;
}
.bgimg2 {
  transform: translate(50%, 20%);
  width: 100px;
  height: 100px;
  background-color: aquamarine;
  margin: 20px;
  background-image: url('../../assets/imgs/simple.png')
}
</style>