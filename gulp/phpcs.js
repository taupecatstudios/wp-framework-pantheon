export default ( gulp, plugins, args, paths, project ) => {

	const options = {
		bin: paths.base + '/vendor/squizlabs/php_codesniffer/bin/phpcs',
	};

	gulp.task( 'phpcs', gulp.parallel( [ 'phpcs:theme', 'phpcs:plugin' ] ) );

	gulp.task( 'phpcs:theme', () => {

		options.standard = paths.srcTheme + '/phpcs.xml';

		return gulp.src( paths.srcTheme + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;
	});

	gulp.task( 'phpcs:plugin', () => {

		options.standard = paths.srcPlugin + '/phpcs.xml';

		return gulp.src( paths.srcPlugin + '/**/*.php' )
			.pipe( plugins.plumber() )
			.pipe( plugins.phpcs( options ) )
			.pipe( plugins.phpcs.reporter( 'log' ) )
		;
	});
}
