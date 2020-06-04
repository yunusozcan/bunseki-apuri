const { src, dest }  = require("gulp");
const uglify = require('gulp-uglify-es').default;
const rename = require("gulp-rename");

function minifyjs() {

    const version = "1.0.0";

    return src('bunseki.js', { allowEmpty: true })
        .pipe(rename("bunseki.min."+ version +".js"))
        .pipe(uglify({mangle: {reserved: ['Bunseki']}}))
        .pipe(dest('dist'));

};

exports.default = minifyjs;
