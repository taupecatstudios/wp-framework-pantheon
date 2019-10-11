/**
 * composer
 *
 * Run composer install.
 */

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'composer', ( done ) => {

		plugins.composer();

		done();
	});
}
