import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts'
    }),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()]
    }),
    viteMockServe()
  ]
});
