const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const uglify = require('rollup-plugin-uglify').uglify;
const pkg = require('./package.json');
const merge = require('lodash').merge
const browsersync = require('rollup-plugin-browsersync')

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

// 打包任务的个性化配置
const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'CatV',
    },
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'CatV',
    },
    plugins: [uglify()],
  },
  dev: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'CatV',
    },
    plugins: [
      uglify(),
      browsersync({
        ui: { port: 8080 },
        files: ["lib/index.js", "test/**/*"],
        server: {
          baseDir: ["test", "lib"],
          index: "index.html"
        }
      })
    ],
  }
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

module.exports = merge(
  {
    input: resolve('./src/index.ts'),
    output: {},
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
  mergeConfig,
);