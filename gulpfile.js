var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

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
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('server', function () {
    connect.server();
});

gulp.task('default', ['less', 'js', 'server', 'watch']);