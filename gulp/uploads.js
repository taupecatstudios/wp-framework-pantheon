/**
 * Symlink the uploads directory on dev.
 */

'use strict';

import vfs from 'vinyl-fs';

export default ( gulp, plugins, args, paths ) => {

	gulp.task( 'uploads', done => {

		return vfs.src( 'uploads' )
			.pipe( vfs.symlink( paths.dest + '/wp-content', { relativeSymlinks: true }));

		done();
	});
}
