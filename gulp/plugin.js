/**
 * plugin
 *
 * Build the project-specific plugin.
 */

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'plugin', gulp.parallel( [ 'plugin:plugin', 'plugin:loader' ] ) );

	gulp.task( 'plugin:plugin', ( done ) => {

		gulp.src( paths.srcPlugin + '/**/*' )
			.pipe( plugins.changed( paths.webPlugin ) )
			.pipe( gulp.dest( paths.webPlugin ) )
			.pipe( plugins.livereload() )
		;

		done();
	});

	gulp.task( 'plugin:loader', ( done ) => {

		gulp.src( paths.src + '/mu-plugin.php', { allowEmpty: true } )
			.pipe( plugins.rename( project + '.php' ) )
			.pipe( gulp.dest( paths.web + '/wp-content/mu-plugins' ) )
		;

		done();
	});
}
