/**
 * acf-json
 *
 * symlink acf-json directory to theme directory
 */

import vfs from 'vinyl-fs';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'acf-json', ( done ) => {

		gulp.src( paths.base + '/acf-json' )
			.pipe( vfs.symlink( paths.webTheme, { relativeSymlinks: true } ) )
		;

		done();
	});
}
