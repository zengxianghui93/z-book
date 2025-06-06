<!--
 * @Description: http://192.168.1.220:3000/read?page=2
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2025-06-06 17:47:25
 * @LastEditors: zengxianghui
 * @LastEditTime: 2025-06-06 18:40:31
-->
<!-- pages/read.vue -->
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed, watch } from "vue";

// 当前页码
const route = useRoute();

// 夜间模式
const isDark = ref(false);

// 模拟分页加载 txt 文件（每页 20 行）
const content = ref<string[]>([]);

const toggleDark = () => {
  isDark.value = !isDark.value;
};

const initDarkMode = () => {
  const saved = localStorage.getItem("darkMode");
  if (saved !== null) {
    isDark.value = saved === "true";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};

const initContent = async () => {
  const pageSize = 20;
  const txt = await $fetch("/file/a.txt");
  const lines = txt.split("\n");
  const pages = Math.ceil(lines.length / pageSize);
  content.value = Array.from({ length: pages }, (_, i) =>
    lines.slice(i * pageSize, (i + 1) * pageSize).join("\n")
  );
};

onMounted(() => {
  initDarkMode();
  initContent();
  const lastPage = localStorage.getItem("lastPage") || 0;
  if (+lastPage === 0) return;
  navigateTo({
    path: `/read`,
    query: {
      page: lastPage,
    },
  });
});

const page = computed(() => parseInt(route.query.page as string) || 1);

watch(isDark, (val) => {
  localStorage.setItem("darkMode", val.toString());
});

watch(
  () => route.query.page,
  (val) => {
    if (val > 0) {
      localStorage.setItem("lastPage", +val);
    }
  }
);
</script>

<template>
  <div :class="['reader', { dark: isDark }]">
    <button
      class="toggle"
      @click="toggleDark"
      :style="{ color: isDark ? '#fff' : '#000' }"
    >
      {{ isDark ? "☀️ 日间模式" : "🌙 夜间模式" }}
    </button>

    <div class="text">
      {{ content[page - 1] || "加载中..." }}
    </div>

    <div class="nav">
      <NuxtLink
        class="pagination"
        :to="`/read?page=${page - 1}`"
        v-if="page > 1"
        >上一页</NuxtLink
      >
      <NuxtLink
        class="pagination"
        :to="`/read?page=${page + 1}`"
        v-if="page < content.length"
        >下一页</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.reader {
  padding: 1rem;
  font-size: 18px;
  line-height: 1.8;
  white-space: pre-wrap;
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  transition: background 0.3s, color 0.3s;
}
.reader.dark {
  background: #121212;
  color: #e0e0e0;
}
.toggle {
  margin-bottom: 1rem;
  font-size: 16px;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: transparent;
  cursor: pointer;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 2rem;
  margin-bottom: 2rem;
  .pagination {
    color: orange;
    font-weight: bold;
    font-size: 3rem;
  }
}
</style>
