/**
 * js
 *
 * Lint and process JavaScript
 */

export default ( gulp, plugins, args, paths, project ) => {

	const tasks = [ 'js:footer', 'js:head', 'js:admin' ];

	gulp.task( 'js:compile', gulp.parallel( tasks ) );

	gulp.task( 'js', gulp.parallel( [ tasks, 'js:lint' ] ) );

	// JavaScript that goes in the footer (usually the most important JS).
	gulp.task( 'js:footer', ( done ) => {

		gulp.src( paths.srcJs + '/footer/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
			.pipe( plugins.concat( project + '.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.webJs ) )
			.pipe( plugins.livereload() )
		;

		done();
	});

	// JavaScript that goes in the head (use with extreme caution!).
	gulp.task( 'js:head', ( done ) => {

		gulp.src( paths.srcJs + '/head/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
			.pipe( plugins.concat( project + '-head.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.webJs ) )
		;

		done();
	});

	// JavaScript for use in the admin
	gulp.task( 'js:admin', ( done ) => {

		gulp.src( paths.srcJs + '/admin/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.depend() )
			.pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
			.pipe( plugins.concat( project + '-admin.js' ) )
			.pipe( plugins.uglify() )
			.pipe( plugins.rename({ suffix: '.min' }) )
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.webJs ) )
		;

		done();
	});

	// ESLint
	gulp.task( 'js:lint', ( done ) => {

		gulp.src( paths.srcJs + '/**/*.js' )
			.pipe( plugins.plumber() )
			.pipe( plugins.eslint( { useEslintrc: true } ) )
			.pipe( plugins.eslint.format() )
		;

		done();
	});
}
