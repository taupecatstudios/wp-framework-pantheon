/**
 * acf
 *
 * Production: copy acf-json directory to theme directory
 * Development: symlink acf-json directory to theme directory
 */

'use strict';

import vfs from 'vinyl-fs';

export default ( gulp, plugins, args, paths ) => {

	gulp.task( 'acf', done => {

		if ( args['production'] ) {

			return gulp
				.src( 'acf-json' )
				.pipe( gulp.dest( paths.dest_theme ) );

			done();
		}

		return gulp
			.src( 'acf-json' )
			.pipe( vfs.symlink( paths.dest_theme, { relativeSymlinks: true } ) );

		done();
	});
}
