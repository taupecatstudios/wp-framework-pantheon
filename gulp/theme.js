/**
 * theme
 *
 * Build the project theme.
 */

'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'theme', done => {

		return gulp.src( paths.src_theme + '/**/*' )
			.pipe( plugins.changed( paths.dest_theme ) )
			.pipe( gulp.dest( paths.dest_theme ) )
			.pipe( plugins.livereload() );

		done();
	});
}
