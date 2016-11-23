"use strict";

const gulp = require('gulp');
const del = require('del');
const pngquant = require('imagemin-pngquant');
const $ = require("gulp-load-plugins")({ lazy: true });

// Config
const config = {
    iisPort:    39154,
    bower:      './bower_components',
    node:       './node_modules',
    src:        './public/Assets/src',
    dist:       './public/Assets/dist',
};

const vendorJs = [ 
    `${config.bower}/angular-touch/angular-touch.min.js`,
    `${config.bower}/angular-route/angular-route.js`,
    `${config.bower}/hammerjs/hammer.js`,
    `${config.bower}/AngularHammer/angular.hammer.js`,
    `${config.node}/sortablejs/Sortable.js`,
    `${config.node}/sortablejs/ng-sortable.js`,
    `${config.node}/angular-filter/dist/angular-filter.min.js`
];

const baseJs = [
    `${config.src}/Js/app.js`,
    `${config.src}/Js/components/**/*.js`,
    `${config.src}/Js/services/**/*.js`
];

// Js
gulp.task('concatJs.vendor', () => {
    return gulp.src(vendorJs)
        .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(`${config.dist}/Js`))
});

gulp.task('concatJs.base', () => {
    return gulp.src(baseJs)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('base.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(`${config.dist}/Js`))
});

gulp.task('templates', ()=> {
    return gulp.src(`${config.src}/Js/components/**/*.html`)
        .pipe($.flatten())
        .pipe(gulp.dest(`${config.dist}/Templates/`))
})

const processMinifyJS =(src, name)=> {
    return gulp.src(src)
        .pipe($.cached('jsmin' + name))
        .pipe($.uglify({ mangle: false }))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${config.dist}/Js/`));
};

gulp.task('scripts.vendor', ['concatJs.vendor'], ()=> processMinifyJS(`${config.dist}/Js/vendor.js`, 'vendor'));
gulp.task('scripts', ['concatJs.base'], ()=> processMinifyJS(`${config.dist}/Js/base.js`, 'base'));

// Styles
const stylesStream =(source, name, dist)=> {
    dist = dist || config.dist
    return gulp.src(source)
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(['last 2 version', 'ie 9']))
        .pipe($.rename({ basename: name, suffix: '.min' }))
        .pipe($.csso())
        .pipe(gulp.dest(`${dist}/Css/`))
        .pipe($.sourcemaps.write('./Maps/'));
};

gulp.task('styles.vendor', ()=> stylesStream(`${config.src}/Sass/vendor/vendor.scss`, 'vendor'));
gulp.task('styles', ()=> stylesStream(`${config.src}/Sass/base.scss`, 'base'));

// Images
gulp.task('images', ()=> {
    return gulp.src(config.src + '/Img/*')
        .pipe($.if(!config.dev, $.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
        })))
        .pipe(gulp.dest(config.dist + '/Img/'));
});

gulp.task('watch', ()=> {
    gulp.watch([`${config.src }/Sass/**/*.scss`, `!${config.src}/Sass/vendor/**/*.scss`], ['styles']);
    gulp.watch(baseJs, ['scripts']);
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch(`${config.src}/Js/components/**/*.html`, ['templates'])
});

// Clean
gulp.task('clean', cb=> del(
    [
        `${config.dist}/Css`,
        `${config.dist}/Js`,
        `${config.dist}/Img`,
    ], { force: true }, cb)
);

// Main tasks
gulp.task('default', ['styles', 'scripts', 'templates']);
gulp.task('build', ['clean'], ()=> gulp.start(['templates', 'styles.vendor', 'scripts.vendor', 'scripts', 'styles', 'images']));
