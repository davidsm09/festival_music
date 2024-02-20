const { src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


//Imagenes
const avif = require('gulp-avif');
const imagemin = require ('gulp-imagemin');
const cache = require('gulp-cache');


function css(done) {

    src('src/scss/**/*.scss')// 1 - identificar el archivo sass
    .pipe( plumber())
    .pipe( sass() ) // 2- compilarlo
    .pipe( dest( "build/css" ) ); // 3 - almacenar en el disco duro
    
    
    // 1 = la parte de src se encarga de identificar y el pipe se encarga de ejecutar la funcion de compilado, 3 la funcion dest se encarga de almacenar en disco en la ruta que le demos
    
    
    
    done();// callback que avisa a gulp cuando llegamos al final
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }

    src('FestivalMusica_inicio/img/**/*.{png,PNG,jpg,JPG}')
    .pipe( cache( imagemin() ) )
    .pipe( dest('build/img'))


    done()
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    }

    src('FestivalMusica_inicio/img/**/*.{png,PNG,jpg,JPG}')
    .pipe( avif(opciones))
    .pipe( dest('build/img'))


    done()
}

async function versionWebp(done) {

    const webp = await import("gulp-webp"); // Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal" 

    const opciones = {
        quality: 50
    };
    
    src('FestivalMusica_inicio/img/**/*.{png,PNG,jpg,JPG}') //identificar todos los archivos a ejecutar y se especifica su formato
    .pipe( webp.default(opciones))
    .pipe( dest('build/img'))
    
    
    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución del script
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    
    
    
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);