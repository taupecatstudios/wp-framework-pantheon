/**
 * js
 *
 * Lint and process JavaScript
 */

'use strict';

export default ( gulp4, plugins, args, paths, project ) => {

	const tasks = [ 'js:front-end', 'js:admin' ];

	if ( ! args['production'] ) {

		tasks.push( 'js:eslint' );
	}

	gulp4.task( 'js', gulp4.series( tasks ) );

	// Front-end
	gulp4.task( 'js:front-end', gulp4.series( [ 'js:front-end:unuglified', 'js:front-end:uglified' ] ) );

	gulp4.task( 'js:front-end:unuglified', () => {

		return gulp4.src( paths.src_js + '/front-end/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.concat( project + '.js' ) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp4.dest( paths.dest_js ) )
			.pipe( plugins.livereload() );
	});

	gulp4.task( 'js:front-end:uglified', () => {

		return gulp4.src( paths.src_js + '/front-end/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.concat( project + '.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( gulp4.dest( paths.dest_js ) );
	});

	// Admin
	gulp4.task( 'js:admin', gulp4.series( [ 'js:admin:unuglified', 'js:admin:uglified' ] ) );

	gulp4.task( 'js:admin:unuglified', () => {

		return gulp4.src( paths.src_js + '/admin/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.concat( project + '-admin.js' ) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp4.dest( paths.dest_js ) );
	});

	gulp4.task( 'js:admin:uglified', () => {

		return gulp4.src( paths.src_js + '/admin/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.concat( project + '-admin.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( gulp4.dest( paths.dest_js ) );
	});

	// ESLint
	gulp4.task( 'js:eslint', () => {

		return gulp4.src( [
			paths.src_js + '/front-end/**/*.js',
			paths.src_js + '/admin/**/*.js'
		] )
			.pipe( plugins.plumber() )
			.pipe( plugins.eslint({
				useEslintrc: true
			}))
			.pipe( plugins.eslint.format() )
	});
}
