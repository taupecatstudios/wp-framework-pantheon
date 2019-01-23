/**
 * js
 *
 * Lint and process JavaScript
 */

'use strict';

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [ 'js:front-end', 'js:admin' ];

	if ( ! args['production'] ) {

		tasks.push( 'js:eslint' );
	}

	gulp.task( 'js', gulp.series( tasks ) );

	// Front-end
	gulp.task( 'js:front-end', gulp.series( [ 'js:front-end:unuglified', 'js:front-end:uglified' ] ) );

	gulp.task( 'js:front-end:unuglified', done => {

		return gulp.src( paths.src_js + '/front-end/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.concat( project + '.js' ) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.dest_js ) )
			.pipe( plugins.livereload() );

		done();
	});

	gulp.task( 'js:front-end:uglified', done => {

		return gulp.src( paths.src_js + '/front-end/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.concat( project + '.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( gulp.dest( paths.dest_js ) );

		done();
	});

	// Admin
	gulp.task( 'js:admin', gulp.series( [ 'js:admin:unuglified', 'js:admin:uglified' ] ) );

	gulp.task( 'js:admin:unuglified', done => {

		return gulp.src( paths.src_js + '/admin/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.concat( project + '-admin.js' ) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.dest_js ) );

		done();
	});

	gulp.task( 'js:admin:uglified', done => {

		return gulp.src( paths.src_js + '/admin/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.concat( project + '-admin.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( gulp.dest( paths.dest_js ) );

		done();
	});

	// ESLint
	gulp.task( 'js:eslint', done => {

		return gulp.src( [
			paths.src_js + '/front-end/**/*.js',
			paths.src_js + '/admin/**/*.js'
		] )
			.pipe( plugins.plumber() )
			.pipe( plugins.eslint({
				useEslintrc: true
			}))
			.pipe( plugins.eslint.format() )

		done();
	});
}
