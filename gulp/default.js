/**
 * Default (dev) gulp process
 */

'use strict';

/**
 * default
 */
export default ( gulp4, plugins, args, paths ) => {

	const tasks = [
		'acf',
		'css',
		'js',
		'plugin',
		'theme',
		'uploads',
		'watch'
	];

	gulp4.task( 'default', gulp4.parallel( tasks ) );
};
