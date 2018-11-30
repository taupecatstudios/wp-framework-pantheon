/**
 * Symlink the uploads directory on dev.
 */

'use strict';

import vfs from 'vinyl-fs';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'uploads', () => {

		return vfs.src( 'uploads' )
			.pipe( vfs.symlink( paths.dest + '/wp-content', { relativeSymlinks: true }));
	});
}
