'use strict';

/**
 * js
 * Process custom front-end and admin JavaScript into a single concatenated file,
 * and an uglified version for production.
 */

export default function( gulp, plugins, args, config, taskTarget ) {

	const paths = config.paths;

	gulp.task( 'js', [ 'js:eslint' ], function() {

		var src = [
				paths.node + '/waypoints/lib/jquery.waypoints.min.js',
				paths.node + '/slick-carousel/slick/slick.min.js',
				paths.node + '/select2/dist/js/select2.min.js',
				paths.node + '/rallax.js/dist/rallax.js',
				paths.web + '/wp-content/plugins/jetpack/modules/sharedaddy/sharing.js',
				paths.js_src + '/**/*.js',
			];

		return gulp.src( src )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.concat( 'idirect.js' ) )
			.pipe( gulp.dest( paths.js_dest ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( paths.js_dest ) )
			.pipe( plugins.livereload() );
	});

	gulp.task( 'js:eslint', function() {

		var src = paths.js_src + '/**/*.js';

		return gulp.src( src )
			.pipe( plugins.plumber() )
			.pipe( plugins.eslint({
				useEslintrc: true
			}))
			.pipe( plugins.eslint.format() )
	});
}
