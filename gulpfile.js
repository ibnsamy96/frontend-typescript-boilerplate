import gulp from "gulp"
const { src, dest, series, watch } = gulp

import * as del from "del"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import sourcemaps from "gulp-sourcemaps"
import postcss from "gulp-postcss"
import uglify from "gulp-uglify"

const dirsPaths = {
	src: "./src",
	dest: "./prod",
}

async function cleanDest() {
	return await del.deleteAsync([dirsPaths.dest])
}

function copySrcFilesToProd() {
	return src([
		`${dirsPaths.src}/**/*.*`,
		`!${dirsPaths.src}/**/*.ts`,
		`!${dirsPaths.src}/**/*.css`,
	]).pipe(dest(dirsPaths.dest))
}

function uglifyFilesInPlace() {
	return src(`${dirsPaths.dest}/**/*.js`)
		.pipe(uglify())
		.pipe(dest(dirsPaths.dest))
}

function processTailwindRules() {
	return src(`${dirsPaths.src}/**/*.css`)
		.pipe(sourcemaps.init())
		.pipe(postcss([tailwindcss, autoprefixer()]))
		.pipe(sourcemaps.write("."))
		.pipe(dest(dirsPaths.dest))
}

function setWatchers() {
	watch(
		[
			`${dirsPaths.src}/**/*`,
			`!${dirsPaths.src}/**/*.ts`,
			`!${dirsPaths.src}/**/*.css`,
		],
		function updateDestFiles(cb) {
			copySrcFilesToProd()
			cb()
		}
	)

	watch([`${dirsPaths.src}/**/*.{css,ts}`], function updateDestCSSFiles(cb) {
		processTailwindRules()
		cb()
	})
}

export default series(
	processTailwindRules,
	uglifyFilesInPlace,
	copySrcFilesToProd
)

export { cleanDest, setWatchers }