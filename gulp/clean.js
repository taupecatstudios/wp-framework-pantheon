/**
 * clean
 *
 * Remove the processed theme and must-use plugin directories.
 */

import del from 'del';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'clean', ( done ) => {

		const dirs = [
			paths.webTheme,
			paths.webPlugin,
		];

		del( dirs ).then( ( deletedPaths ) => {

			if ( 0 < deletedPaths.length ) {

				deletedPaths.forEach( ( dir ) => {

					console.log( dir + ' deleted.' );
				});

			} else {

				console.log( 'No directories were deleted.' );
			}
		});

		done();
	});
}
