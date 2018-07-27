import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { uglify } from 'rollup-plugin-uglify';

// 获取编译环境
const BUILD_ENV = process.env.BUILD;

// 获取本机IP
const myIpAddress = function () {
    const iptable={},
    ifaces = require('os').networkInterfaces();
	for (var dev in ifaces) {
		ifaces[dev].forEach(function(details,alias){
			if (details.family === 'IPv4' && details.address.startsWith("10.")) {
				iptable.address = details.address;
			}
		});
    }

    return iptable.address;
}();

// 开发版本配置
const development = {
	input: './index.ts',
	output: {
		file: './bin/js/main.js',
		format: 'cjs'
	},

	plugins: [
		commonjs(),
		typescript({ }),
		resolve(),
		babel({
			exclude: 'node_modules/**'
		}),
		serve({
			contentBase: ['bin'],
			host: myIpAddress ? myIpAddress : 'localhost',
			port: 1081
		}),
		// livereload({
		// 	watch: "bin"
		// })
	]
};

// 生产版本配置
const production = {
	input: './index.ts',
	output: {
		file: './bin/js/main.js',
		format: 'cjs'
	},

	plugins: [
		commonjs(),
		typescript({ }),
		resolve(),
		babel({
			exclude: 'node_modules/**'
		}),
		uglify({
			mangle: false
		})
	]
};

let exportConfig = development;
console.log('BUILD_ENV', BUILD_ENV)
switch(BUILD_ENV) {
	case 'production': exportConfig = production; break;
	case 'development': exportConfig = development; break;
}
export default exportConfig;