/**
 * copy-files
 *
 * Copy certain required files to web/.
 */

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'copy-files', ( done ) => {

		const configFiles = [
			paths.src + '/wp-config.php',
			paths.src + '/wp-config-local.php',
		];

		gulp.src( configFiles )
			.pipe( gulp.dest( paths.web ) )
		;

		done();
	});
}
