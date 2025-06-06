<!--
 * @Description: 
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2025-06-06 10:10:19
 * @LastEditors: zengxianghui
 * @LastEditTime: 2025-06-06 10:11:59
-->
<script setup lang="ts">
definePageMeta({
  keepalive: false,
});

const userInfo = ref("zxh");
</script>

<template>
  <div class="box">this is {{ userInfo }}</div>
</template>

<style lang="scss" scoped>
.box {
  padding: 0px 40px 20px;
  color: orange;
}
</style>
