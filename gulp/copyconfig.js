/**
 * copy-config
 * Copy the wp-config* files to web/.
 */

'use strict';

export default ( gulp, plugins, args, paths ) => {

	gulp.task( 'copy-config', done => {

		let configFiles = [];

		configFiles.push( paths.src + '/wp-config.php' );

		if ( ! args['production'] ) {

			configFiles.push( paths.src + '/wp-config-local.php' );
		}

		return gulp.src( configFiles )
			.pipe( gulp.dest( paths.dest ) );

		done();
	});
}
