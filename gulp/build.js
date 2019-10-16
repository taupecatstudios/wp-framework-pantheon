/**
 * Build gulp process
 */

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [
		'acf-json',
		'copy-files',
		'css',
		'js',
		'plugin',
		'theme',
		'uploads',
	];

	gulp.task( 'build', gulp.series( 'composer', gulp.parallel( tasks ) ) );
};
