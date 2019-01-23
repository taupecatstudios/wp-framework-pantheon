/**
 * plugin
 *
 * Build the project-specific plugin.
 */

'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'plugin:plugin', done => {

		return gulp.src( paths.src_plugin + '/**/*' )
			.pipe( gulp.dest( paths.dest_plugin ) );

		done();
	});

	gulp.task( 'plugin:loader', done => {

		return gulp.src( paths.src + '/mu-plugin.php' )
			.pipe( plugins.rename( project + '.php' ) )
			.pipe( gulp.dest( paths.dest + '/wp-content/mu-plugins' ) )
			.pipe( plugins.livereload() );

		done();
	});

	gulp.task( 'plugin', gulp.series( [ 'plugin:plugin', 'plugin:loader' ] ) );
}
