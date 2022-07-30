import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // 读取环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      // 路径别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      // 自动导入 Vue API
      AutoImport({
        imports: ['vue'],
        dts: 'types/auto-imports.d.ts',
      }),
      // 自动导入组件
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      // setup 语法糖定义组件名称
      VueSetupExtend(),
      // Mock
      viteMockServe(),
      // 打包分析
      process.env.REPORT === 'true'
        ? visualizer({
            filename: 'report.html',
            open: true,
            template: 'sunburst',
            gzipSize: true,
            brotliSize: true,
          })
        : null,
    ],
    server: {
      host: true,
      port: 3000,
      // 本地服务器代理，解决本地接口跨域问题
      proxy: {
        // 开发环境接口
        [env.VITE_PROXY_BASEURL]: {
          target: env.VITE_PROXY_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_PROXY_BASEURL}`), ''),
        },
      },
    },
  };
});
