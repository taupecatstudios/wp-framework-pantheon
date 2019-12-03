'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	const options = { standard: 'WordPress' };

	gulp.task( 'phpcs', gulp.parallel( [ 'phpcs:theme', 'phpcs:plugin' ] ) );

	gulp.task( 'phpcs:theme', () => {

		return gulp.src( paths.srcTheme + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;
	});

	gulp.task( 'phpcs:plugin', () => {

		return gulp.src( paths.srcPlugin + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;
	});
}
