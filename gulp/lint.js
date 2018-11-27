import sequence from 'run-sequence';

export default function( gulp, plugins, args, config, taskTarget ) {

	gulp.task( 'lint', [ 'css:lint', 'php:lint', 'js:eslint' ] );

	gulp.task( 'lint:css', [ 'css:lint' ] );

	gulp.task( 'lint:php', [ 'php:lint'] );

	gulp.task( 'lint:js', [ 'js:eslint' ] );
};
