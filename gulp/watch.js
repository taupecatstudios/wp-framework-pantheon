/**
 * watch
 * Watch files that require a task to act on them.
 */

'use strict';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'watch', function() {

		plugins.livereload.listen({
			host: null
		});

		gulp4.watch( paths.src_css    + '/**/*.scss', gulp4.parallel( 'css' ) );
		gulp4.watch( paths.src_js     + '/**/*.js',   gulp4.parallel( 'js' ) );
		gulp4.watch( paths.src_theme  + '/**/*.php',  gulp4.parallel ( [ 'theme', 'php' ] ) );
		gulp4.watch( paths.src_plugin + '/**/*.php',  gulp4.parallel( [ 'plugin', 'php' ] ) );
	});
};
