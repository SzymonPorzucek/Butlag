const { src, dest, series, parallel, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const kit = require('gulp-kit');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

const rollup = require('gulp-better-rollup'); 
const { nodeResolve } = require('@rollup/plugin-node-resolve'); 
const commonjs = require('@rollup/plugin-commonjs'); 

const reload = browserSync.reload;

const paths = {
	html: './src/html/**/*.kit',
	sass: './src/sass/**/*.scss',
	sassDest: './dist/css',
	css: './src/styles/tailwind.css',
	cssDest: './dist/css',
	js: './src/js/**/*.js',
	jsDest: './dist/js',
	img: './src/images/*',
	imgDest: 'dist/images',
	dist: './dist',
};

function sassCompiler(cb) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	cb();
}

function tailwindCompiler(cb) {
	src(paths.css)
		.pipe(sourcemaps.init())
		.pipe(postcss([tailwindcss, autoprefixer]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.cssDest));
	cb();
}

function javaScript(cb) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(rollup({ plugins: [nodeResolve(), commonjs(), babel({ presets: ['@babel/env'] })] }, 'umd'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.jsDest));
	cb();
}

function convertImg(cb) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	cb();
}
function handleKits(cb) {
	src(paths.html).pipe(kit()).pipe(dest('./dist'));
	cb();
}
function cleanStuff(cb) {
	src(paths.dist, { read: false }).pipe(clean());
	cb();
}
function startBrowserSync(cb) {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
	});
	cb();
}

function watchForChanges(cb) {
	watch('./dist/*.html').on('change', reload);
	watch(
		[paths.html, paths.sass, paths.js],
		parallel(handleKits, sassCompiler, javaScript, tailwindCompiler)
	).on('change', reload);
	watch(paths.img, convertImg).on('change', reload);
	watch(paths.css, tailwindCompiler).on('change', reload);

	cb();
}

const mainFunctions = parallel(
	handleKits,
	sassCompiler,
	tailwindCompiler,
	javaScript,
	convertImg
);
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
exports.cleanStuff = cleanStuff;
