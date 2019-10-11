/**
 * uploads
 *
 * Symlink the uploads directory on dev.
 */

import vfs from 'vinyl-fs';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'uploads', ( done ) => {

		gulp.src( paths.base + '/uploads' )
			.pipe( vfs.symlink( paths.web + '/wp-content', { relativeSymlinks: true } ) )
		;

		done();
	});
}
