'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	const options = { standard: 'WordPress' };

	gulp.task( 'phpcs', gulp.parallel( [ 'phpcs:theme', 'phpcs:plugin' ] ) );

	gulp.task( 'phpcs:theme', ( done ) => {

		gulp.src( paths.srcTheme + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;

		done();
	});

	gulp.task( 'phpcs:plugin', ( done ) => {

		gulp.src( paths.srcPlugin + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;

		done();
	});
}
