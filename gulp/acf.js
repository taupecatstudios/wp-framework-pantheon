/**
 * acf
 *
 * Production: copy acf-json directory to theme directory
 * Development: symlink acf-json directory to theme directory
 */

'use strict';

import vfs from 'vinyl-fs';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'acf', () => {

		if ( args['production'] ) {

			return gulp4
				.src( 'acf-json' )
				.pipe( gulp4.dest( paths.dest_theme ) );

		} else {

			return gulp4
				.src( 'acf-json' )
				.pipe( vfs.symlink( paths.dest_theme, { relativeSymlinks: true } ) );
		}
	});
}
