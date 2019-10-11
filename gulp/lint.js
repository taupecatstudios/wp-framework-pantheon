/**
 * Linting
 */

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [ 'lint:css', 'lint:js', 'lint:php' ];

	gulp.task( 'lint', gulp.parallel( tasks ) );

	gulp.task( 'lint:css', gulp.parallel( [ 'css:lint' ] ) );

	gulp.task( 'lint:js', gulp.parallel( [ 'js:lint' ] ) );

	gulp.task( 'lint:php', gulp.parallel( [ 'phpcs' ] ) );
};
