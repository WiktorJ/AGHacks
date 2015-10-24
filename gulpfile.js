var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var watch = require('gulp-watch');


gulp.task('less', function(){
    gulp.src('./less/styles.less')
        .pipe(less().on('error', function(err){
            console.log(err.message);
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', function () {
    gulp.src(['src/app.js', 'src/**/*.js'])
        .pipe(concat('app.concatenated.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    gulp.src('src/**/*.js')
        .pipe(watch('src/**/*.js', function() {
            gulp.start('js');
        }));

    gulp.src('less/**/*.less')
        .pipe(watch('less/**/*.less', function() {
            gulp.start('less');
        }));
});

gulp.task('server', function () {
    connect.server();
});

gulp.task('default', ['less', 'js', 'server', 'watch']);