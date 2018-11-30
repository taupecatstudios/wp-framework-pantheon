'use strict';

export default ( gulp4, plugins, args, paths, project ) => {

	gulp4.task( 'php:lint', () => {

		return gulp4.src([
			paths.src_theme + '/**/*.php',
			paths.src_plugin + '/**/*.php'
		])
			.pipe( plugins.plumber() )
			// .pipe( plugins.phpcs({
			// 	bin:             'vendor/squizlabs/php_codesniffer/bin/phpcs',
			// 	standard:        'phpcodesniffer-' + project + '-standards',
			// 	warningSeverity: 0,
			// }))
			.pipe( plugins.phpcs.reporter( 'log' ) )
			.pipe( plugins.livereload() );
	});

	gulp4.task( 'php', gulp4.series( 'php:lint' ) );
}
