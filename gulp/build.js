/**
 * build
 *
 * Run the acf, composer, css, js, plugin, and theme tasks without running the linting
 * or watching.
 */

'use strict';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'build', gulp4.series( [ 'clean', 'composer' ], gulp4.parallel([
		'acf',
		'css',
		'js',
		'plugin',
		'theme'
	])));
};
