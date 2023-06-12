import typescript from '@rollup/plugin-typescript';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import dev from 'rollup-plugin-dev';
import livereload from 'rollup-plugin-livereload';
import pkg from '../package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: ['test/manual/experiments.ts'],
    output: {
        dir: 'build-dev',
        format: 'umd',
        sourcemap: true,
        name: pkg.name,
    },
    plugins: [
        typescript(),
        nodeResolve(),
        htmlTemplate({
            template: 'test/manual/template.html',
            target: 'index.html',
        }),
        dev('build-dev'),
        livereload('build-dev'),
    ],
};
