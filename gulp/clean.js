/**
 * clean
 *
 * Remove the /web directory.
 */

import del from 'del';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'clean', ( done ) => {

		del( paths.web ).then( ( deletedPaths ) => {

			if ( 0 < deletedPaths.length ) {

				console.log( deletedPaths[0] + ' deleted.' );
			}
		});

		done();
	});
}
