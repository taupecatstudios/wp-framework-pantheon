/**
 * Default (dev) gulp process
 */

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [ 'acf-json', 'copy-files', 'css', 'js', 'plugin', 'theme', 'uploads', 'watch' ];

	gulp.task( 'default', gulp.series( 'composer', gulp.parallel( tasks ) ) );
};
