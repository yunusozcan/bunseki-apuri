const  { src, dest, series }  = require("gulp");
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");
const template = require('gulp-template');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

function config() {
    return src('config.tmpl.js')
        .pipe(template({url: `${process.env.API_URL}`}))
        .pipe(rename('config.js'))
        .pipe(dest('./'));
};

function minifyjs() {

    const version = "1.0.0";

    const b = browserify({
        entries: './bunseki.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify({mangle: {reserved: ['Bunseki']}}))
        .pipe(rename("bunseki.min."+ version +".js"))
        .pipe(dest('dist'));
};
exports.default = series(config, minifyjs);
