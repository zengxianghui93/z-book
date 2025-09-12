<!--
 * @Description: 卡片生成器
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2025-09-12 15:48:07
 * @LastEditors: zengxianghui
 * @LastEditTime: 2025-09-12 16:51:31
-->
<script setup>
import { ref, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";

const text = ref();

const cardRef = ref(null);
const textRef = ref(null);

const adjustFontSize = () => {
  if (!cardRef.value || !textRef.value) return;
  let fontSize = 32;
  textRef.value.style.fontSize = fontSize + "px";
  while (
    cardRef.value.scrollHeight > cardRef.value.clientHeight &&
    fontSize > 12
  ) {
    fontSize--;
    textRef.value.style.fontSize = fontSize + "px";
  }
};

// onMounted(() => {
//   nextTick(() => adjustFontSize());
// });

const downloadCard = async () => {
  if (!cardRef.value) return;
  const canvas = await html2canvas(cardRef.value, { scale: 2 });
  const link = document.createElement("a");
  link.download = "card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

// 模拟分页加载 txt 文件（每页 20 行）
const content = ref([]);

const getText = async () => {
  const pageSize = 10;
  const txt = await $fetch("/file/a.txt");
  const lines = txt.split("\n");
  console;
  const pages = Math.ceil(lines.length / pageSize);
  content.value = Array.from({ length: pages }, (_, i) =>
    lines.slice(i * pageSize, (i + 1) * pageSize).join("\n")
  );
};

onMounted(async () => {
  await getText();
  console.log("content.value::", content.value[100]);
  text.value = "";
  // text.value = content.value[100];
  nextTick(() => adjustFontSize());
});
</script>

<template>
  <div class="bg-gray-100 h-screen">
    <button
      @click="downloadCard"
      class="download-btn mt-5 px-5 py-2 rounded-lg bg-green-500 text-white text-base"
    >
      下载卡片
    </button>
    <div
      ref="cardRef"
      class="w-[100vw] h-screen bg-gradient-to-br from-cyan-200 to-indigo-200 text-gray-800 flex items-center justify-center p-5 rounded-2xl shadow-lg text-justify"
    >
      <div ref="textRef" class="w-full leading-relaxed break-words">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-btn {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>
