/**
 * theme
 *
 * Build the project theme.
 */

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'theme', ( done ) => {

		gulp.src( paths.srcTheme + '/**/*' )
			.pipe( plugins.changed( paths.webTheme ) )
			.pipe( gulp.dest( paths.webTheme ) )
			.pipe( plugins.livereload() )
		;

		done();
	});
}
