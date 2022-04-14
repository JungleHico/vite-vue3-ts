import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    // 自动导入组合式API
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts'
    }),
    // ant-design-vue按需导入
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    // mock
    viteMockServe(),
    // 打包分析
    visualizer(() => {
      return {
        template: 'sunburst',
        gzipSize: true
      };
    })
  ]
});
