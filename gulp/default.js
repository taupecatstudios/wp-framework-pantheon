/**
 * Default (dev) gulp process
 */

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [
		'copy-files',
		'css',
		'js',
		'plugin',
		'theme',
	];

	gulp.task( 'default', gulp.series( 'composer', gulp.parallel( tasks ) ) );
};
