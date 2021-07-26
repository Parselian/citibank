let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    imageMin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    gulpSVG = require('gulp-svg-sprite'),
    bs = require('browser-sync').create();

gulp.task('serve', () => {
    bs.init({
        open: 'external',
        host: 'citi-bank-test-task.loc',
        proxy: 'citi-bank-test-task.loc/build',
        port: 8080
    })

    gulp.watch("./build/**/*.php").on('change', bs.reload)
})

gulp.task('sass', () => {
    return gulp.src('./build/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("./build/assets/css"))
        .pipe(bs.stream())
})

gulp.task('svg', () => {
    return gulp.src('./build/assets/svg/*.svg')
        .pipe(gulpSVG({
            mode: {
                stack: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('./build/assets/'))
})

gulp.task('watch', () => {
    gulp.watch('./build/assets/sass/**/*.scss', gulp.series(['sass']))
})

gulp.task('default', gulp.series(
    'sass',
    gulp.parallel(['watch'], ['serve'])
))