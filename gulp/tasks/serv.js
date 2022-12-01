module.exports = function (){

  $.gulp.task('serv', function() {
    $.browserSync.init({
        server: {
            baseDir: './' + $.public
      },
      notify: false,
      // online: false
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
    });

});

}
