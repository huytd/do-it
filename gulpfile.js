var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', [], function () {
    console.log("Command:\n   serve - run live reload server");
});

gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });

    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
    gulp.watch(['css/*.css'], reload);
});