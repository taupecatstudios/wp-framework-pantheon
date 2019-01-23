/**
 * build
 *
 * Run the acf, composer, css, js, plugin, and theme tasks without running the linting
 * or watching.
 */

'use strict';

export default ( gulp, plugins, args, paths ) => {

	gulp.task(
		'build',
		gulp.series(
			[ 'clean', 'composer' ],
			gulp.parallel( [ 'acf', 'css', 'js', 'plugin', 'theme' ] )
		)
	);
};
