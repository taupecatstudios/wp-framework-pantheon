'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'php:lint', done => {

		return gulp.src([
			paths.src_theme + '/**/*.php',
			paths.src_plugin + '/**/*.php'
		])
			.pipe( plugins.plumber() )
			.pipe( plugins.changed( paths.dest_theme ) )
			.pipe( plugins.phpcs({
				bin:             'vendor/squizlabs/php_codesniffer/bin/phpcs',
				standard:        'phpcodesniffer-' + project + '-standards',
				warningSeverity: 0,
			}))
			.pipe( plugins.phpcs.reporter( 'log' ) );

		done();
	});

	gulp.task( 'php', gulp.series( 'php:lint' ) );
}
