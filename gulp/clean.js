/**
 * clean
 *
 * Remove the /web directory.
 */

'use strict';

import del from 'del';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'clean', () => {

		return del( paths.dest ).then( paths => {

			if ( 0 < paths.length ) {

				console.log( 'Web directory deleted.' );
			}
		});
	});
}
