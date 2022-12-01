module.exports = function () {

	// Your "watch" task
	$.gulp.task('watch', function () {
		$.gulp.watch([$.sourse + '/sass/**/*.css', $.sourse + '/pug/blocks/**/*.scss', $.sourse + '/sass/**/*.scss', $.sourse + '/sass/**/*.sass'], { usePolling: true }, $.gulp.series('sass'));
		$.gulp.watch($.sourse + '/pug/**/*.pug', { usePolling: true },  $.gulp.series('pug'));
		$.gulp.watch($.sourse + '/svg/*.svg', { usePolling: true }, $.gulp.series('svg'));
		// $.gulp.watch([$.sourse + '/js/libs.js'], { usePolling: true }, $.gulp.series('scripts'));
		$.gulp.watch($.sourse + '/sass/*.svg', { usePolling: true }, $.gulp.series('svgCopy'));

		$.gulp.watch([$.sourse + '/js/common.js'], { usePolling: true }, $.gulp.series('scripts:common'));
		$.gulp.watch($.sourse + '/img', { usePolling: true }, $.gulp.series('img-responsive'));
	});

}