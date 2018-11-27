'use strict';

import css       from './css';
import sequence  from 'run-sequence';

/**
 * default
 */
export default function( gulp, plugins, args, config, taskTarget, refreshLib ) {

	gulp.task( 'default', function( callback ) {

		sequence(
			[ 'css', 'js' ],
			'watch',
			callback
		);
	});
};
