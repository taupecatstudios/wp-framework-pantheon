/**
 * plugin
 *
 * Build the project-specific plugin.
 */

'use strict';

export default ( gulp4, plugins, args, paths, project ) => {

	gulp4.task( 'plugin:plugin', () => {

		return gulp4.src( paths.src_plugin + '/**/*' )
			.pipe( gulp4.dest( paths.dest_plugin ) );
	});

	gulp4.task( 'plugin:loader', () => {

		return gulp4.src( paths.src + '/mu-plugin.php' )
			.pipe( plugins.rename( project + '.php' ) )
			.pipe( gulp4.dest( paths.dest + '/wp-content/mu-plugins' ) )
			.pipe( plugins.livereload() );
	});

	gulp4.task( 'plugin', gulp4.series( [ 'plugin:plugin', 'plugin:loader' ] ) );
}
