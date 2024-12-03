<template>
  <div class="content">
    <p class="testp">啦啦啦啦啦{{msg}}</p>
    <h2>biaosdsof啥电费卡是否</h2>
    <div class="bgimg"></div>
    <div class="bgimg2"></div>
    <ul class="ulpart">
      <li>111<p>卡撒的发生李海峰</p></li>
      <li>2<p>的放散阀</p></li>
      <li>3<p>阿士大夫撒旦法玩儿</p></li>
    </ul>
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
    document.getElementsByClassName('ulpart')[0].addEventListener('click',(event) => {
      console.log(event.target.index)
    })
  }
}
</script>

<style lang="less" scoped>
.testp{
  font-size: 12px; /*px*/ /*no*/
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