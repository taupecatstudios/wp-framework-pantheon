/**
 * watch
 * Watch files that require a task to act on them.
 */

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'watch', ( done ) => {

		plugins.livereload.listen();

		gulp.watch( paths.srcSass   + '/**/*.scss', gulp.parallel( 'css' ) );
		gulp.watch( paths.srcJs     + '/**/*.js',   gulp.parallel( 'js' ) );
		gulp.watch( paths.srcTheme  + '/**/*.php',  gulp.parallel( [ 'theme', 'phpcs:theme' ] ) );
		gulp.watch( paths.srcPlugin + '/**/*.php',  gulp.parallel( [ 'plugin:plugin', 'phpcs:plugin' ] ) );

		done();
	});
};
