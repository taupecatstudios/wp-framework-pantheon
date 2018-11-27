'use strict';

import css       from './css';
import sequence  from 'run-sequence';

/**
 * build
 */
export default function( gulp, plugins, args, config, taskTarget, refreshLib ) {

	gulp.task( 'build', function( callback ) {

		sequence(
			[ 'css', 'js' ],
			callback
		);
	});
};
