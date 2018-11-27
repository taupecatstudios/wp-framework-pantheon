'use strict';

const phpcs   = require( 'gulp-phpcs' ),
      phpcbf  = require( 'gulp-phpcbf' );

export default function( gulp, plugins, args, config, taskTarget ) {

	const paths = config.paths;

	gulp.task('php', [
		'php:lint',
	]);

	gulp.task( 'php:lint', function() {

		var src = [
			paths.theme + '/**/*.php',
		];
		return gulp.src(src)
			.pipe( plugins.plumber() )
			// .pipe( phpcs({
			// 	bin: 'vendor/squizlabs/php_codesniffer/bin/phpcs',
			// 	standard: 'phpcodesniffer-idirect-standards',
			// 	warningSeverity: 0,
			// 	ignore: [ 'web/wp-content/themes/idirect/woocommerce' ],
			// }))
			// .pipe( phpcs.reporter('log') );
			.pipe( plugins.livereload() );
	});
}
