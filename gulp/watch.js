'use strict';

/**
 * watch
 * Watch files that require a task to act on them.
 */
export default function( gulp, plugins, args, config, taskTarget ) {

	const paths = config.paths;

	gulp.task( 'watch', function() {

		plugins.livereload.listen({
			host: null
		});

		gulp.watch( paths.sass + '/**/*.scss',              [ 'css' ] );
		gulp.watch( paths.js_src + '/**/*.js',              [ 'js' ] );
		gulp.watch( paths.theme + '/**/*.php',              [ 'php' ] );
	});
};
