var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

gulp.task('less', function(){
    gulp.src('./less/styles.less')
        .pipe(less().on('error', function(err){
            console.log(err.message);
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function(){
    gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('server', function () {
    connect.server();
});

gulp.task('default', ['less', 'server', 'watch']);