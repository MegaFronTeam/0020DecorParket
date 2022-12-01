module.exports = function (){

	
	$.gulp.task('file', function () {
 
		return 	$.gulp.src([$.sourse + '/libs/**']).pipe($.gulp.dest($.public + '/libs')).on('end',$.browserSync.reload);
});

}