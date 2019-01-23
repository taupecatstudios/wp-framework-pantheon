/**
 * Default (dev) gulp process
 */

'use strict';

/**
 * default
 */
export default ( gulp, plugins, args, paths ) => {

	const tasks = [
		'acf',
		'copy-config',
		'css',
		'js',
		'plugin',
		'theme',
		'php:lint',
		'uploads',
		'watch'
	];

	gulp.task( 'default', gulp.series( 'composer', gulp.parallel( tasks ) ) );
};
