/**
 * theme
 *
 * Build the project theme.
 */

'use strict';

export default ( gulp4, plugins, args, paths, project ) => {

	gulp4.task( 'theme', () => {

		return gulp4.src( paths.src_theme + '/**/*' )
			.pipe( plugins.changed( paths.dest_theme ) )
			.pipe( gulp4.dest( paths.dest_theme ) )
			.pipe( plugins.livereload() );
	});
}
