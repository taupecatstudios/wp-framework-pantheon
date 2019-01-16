/**
 * composer
 *
 * Run composer install.
 */

'use strict';

export default ( gulp, plugins ) => {

	gulp.task( 'composer', () => {

		return plugins.composer();
	});
}
