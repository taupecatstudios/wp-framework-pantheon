/**
 * watch
 * Watch files that require a task to act on them.
 */

'use strict';

export default ( gulp, plugins, args, paths ) => {

	gulp.task( 'watch', function() {

		plugins.livereload.listen({
			host: null
		});

		gulp.watch( paths.src_css    + '/**/*.scss', gulp.parallel( 'css' ) );
		gulp.watch( paths.src_js     + '/**/*.js',   gulp.parallel( 'js' ) );
		gulp.watch( paths.src_theme  + '/**/*.php',  gulp.parallel ( [ 'theme', 'php' ] ) );
		gulp.watch( paths.src_plugin + '/**/*.php',  gulp.parallel( [ 'plugin', 'php' ] ) );
	});
};
