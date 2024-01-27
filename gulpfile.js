const { src, dest, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done) {

    src('src/scss/**/*.scss')// 1 - identificar el archivo sass
    .pipe( plumber())
    .pipe( sass() ) // 2- compilarlo
    .pipe( dest( "build/css" ) ); // 3 - almacenar en el disco duro
    
    
    // 1 = la parte de src se encarga de identificar y el pipe se encarga de ejecutar la funcion de compilado, 3 la funcion dest se encarga de almacenar en disco en la ruta que le demos
    
    
    
    done();// callback que avisa a gulp cuando llegamos al final
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    
    
    
    done();
}

exports.css = css;
exports.dev = dev;