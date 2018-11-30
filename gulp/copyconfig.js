/**
 * copy-config
 * Copy the wp-config* files to web/.
 */

'use strict';

export default ( gulp4, plugins, args, paths ) => {

	gulp4.task( 'copy-config', () => {

		let configFiles = [];

		configFiles.push( paths.src + '/wp-config.php' );

		if ( ! args['production'] ) {

			configFiles.push( paths.src + '/wp-config-local.php' );
		}

		return gulp4.src( configFiles )
			.pipe( gulp4.dest( paths.dest ) );
	});
}
