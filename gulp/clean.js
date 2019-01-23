/**
 * clean
 *
 * Remove the /web directory.
 */

'use strict';

import del from 'del';

export default ( gulp, plugins, args, paths ) => {

	gulp.task( 'clean', done => {

		return del( paths.dest ).then( paths => {

			if ( 0 < paths.length ) {

				console.log( 'Web directory deleted.' );
			}
		});

		done();
	});
}
