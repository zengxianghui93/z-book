/*
 * @Description:
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2025-06-04 12:13:51
 * @LastEditors: zengxianghui
 * @LastEditTime: 2025-06-06 16:08:08
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@vant/nuxt"],
  css: ["~/assets/main.scss"],
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        // {
        //   name: "viewport",
        //   content:
        //     "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        // },
        {
          name: "viewport",
          content: "width=750,user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: "z-book",
        }, // 页面描述
        { name: "keywords", content: "h5" },
        { name: "author", content: "z-book" },
        { name: "theme-color", content: "#ffffff" },
      ],
      // script: [
      //   {
      //     src: "//cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.js",
      //   },
      // ],
      //   script: [
      //     {
      //         src: '//api.map.baidu.com/api?v=3.0&ak=ABA2UQFf2U1AQi4bEbgrjJEYpdJEVZNp',
      //     }
      //   ]
      // link: [
      //   { rel: "icon", type: "image/png", href: "/favicon.png" }, // 网站图标
      //   {
      //     rel: "apple-touch-icon",
      //     sizes: "180x180",
      //     href: "/apple-touch-icon.png",
      //   }, // iOS 图标
      // ],
    },
    baseURL: process.env.BASE_URL,
    keepalive: true,
  },
});
