<!--
 * @Description: 卡片生成器
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2025-09-12 15:48:07
 * @LastEditors: zengxianghui
 * @LastEditTime: 2025-09-15 15:26:59
-->
<script setup>
import { ref, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";

const containerRef = ref(null);
const pages = ref([]);
const currentPage = ref(0);

const downloadCard = async () => {
  if (!containerRef.value) return;

  const { width, height } = containerRef.value.getBoundingClientRect(); // DOM 实际显示尺寸
  const canvas = await html2canvas(containerRef.value, {
    scale: 2,
    useCORS: true,
    width,
    height,
  });
  const link = document.createElement("a");
  link.download = "card.png";
  link.href = canvas.toDataURL("image/png");
  console.log("link:", link.href);
  link.click();
};

const loadTxt = async () => {
  const txt = await $fetch("/file/a.txt");
  await nextTick();
  paginateByLines(txt);
};

const paginateByLines = (text) => {
  const styles = window.getComputedStyle(containerRef.value);

  const fontSize = 34; // 固定 32px
  let lineHeight = fontSize * 1.6; // 固定行高 1.6

  // 计算容器可用高度（减 padding）
  const containerHeight =
    containerRef.value.offsetHeight -
    parseFloat(styles.paddingTop) -
    parseFloat(styles.paddingBottom);

  // 一屏最多能显示的完整行数
  const maxLines = Math.floor(containerHeight / lineHeight);

  console.log(
    "容器高:",
    containerHeight,
    "每行高:",
    lineHeight,
    "最大行数:",
    maxLines
  );

  const lines = text.split(/\n/);
  let allPages = [];

  for (let i = 0; i < lines.length; i += maxLines) {
    allPages.push(lines.slice(i, i + maxLines).join("\n"));
  }

  pages.value = allPages;
};

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < pages.value.length - 1) currentPage.value++;
  console.log("content:>>>>>", pages.value[currentPage.value]);
};

onMounted(async () => {
  await loadTxt();
});
</script>

<template>
  <div class="read-box">
    <div class="reader-container" ref="containerRef">
      <!-- <pre class="page-text">{{ pages[currentPage] || "" }}</pre> -->
      <pre class="page-text"></pre>
    </div>

    <div class="controls">
      <button @click="prevPage" :disabled="currentPage === 0">上一页</button>
      <span>{{ currentPage + 1 }} / {{ pages.length }}</span>
      <button @click="nextPage" :disabled="currentPage === pages.length - 1">
        下一页
      </button>
      <button @click="downloadCard">下载</button>
    </div>
  </div>
</template>

<style scoped>
.reader-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
  color: #fff;
  /* background: linear-gradient(to bottom, #44d1e3, #64bbc6); */

  background-image: url("/11.jpg");
  background-size: cover;
  background-position: center;
}

.page-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 32px;
  line-height: 1.5;
  padding-bottom: 20px;
}
.controls {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 0;
  font-size: 24px;
  color: azure;
}
</style>
