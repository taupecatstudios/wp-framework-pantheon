/**
 * uploads
 *
 * Symlink the uploads directory on dev.
 */

import del from 'del';
import vfs from 'vinyl-fs';

export default ( gulp, plugins, args, paths, project ) => {

	gulp.task( 'uploads', ( done ) => {

		del( paths.web + '/wp-content/uploads' ).then( () => {

			gulp.src( paths.base + '/uploads' )
				.pipe( vfs.symlink( paths.web + '/wp-content', { relativeSymlinks: true } ) )
			;
		});

		done();
	});
}
