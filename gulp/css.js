/**
 * css
 *
 * Lint and process Sass into CSS
 */

'use strict';

import autoprefixer from 'autoprefixer';
import csswring     from 'csswring';

export default ( gulp, plugins, args, paths ) => {

	const tasks = [ 'css:unminified', 'css:minified' ];

	if ( ! args['production'] ) {

		tasks.push( 'css:lint' );
	}

	gulp.task( 'css', gulp.series( tasks ) );

	// Unminified, sourcemapped
	gulp.task( 'css:unminified', done => {

		return gulp.src( paths.src_css + '/**/*.scss' )
			.pipe( plugins.plumber() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer({
					grid:     true,
					browsers: [ '>1%' ],
				})
			]))
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.dest_css ) )
			.pipe( plugins.livereload() );

		done();
	});

	// Minified, not sourcemapped
	gulp.task( 'css:minified', done => {

		return gulp.src( paths.src_css + '/**/*.scss' )
			.pipe( plugins.plumber() )
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer(),
				csswring()
			]))
			.pipe( plugins.rename({
				suffix: '.min'
			}))
			.pipe( gulp.dest( paths.dest_css ) );

		done();
	});

	gulp.task( 'css:lint', done => {

		return gulp.src( paths.src_css + '/**/*.scss' )
			.pipe( plugins.sassLint({
				options: {
					formatter: 'stylish',
					'merge-default-rules': true,
				},
				configFile: '.sass-lint.yml'
			}))
			.pipe( plugins.sassLint.format() )
			.pipe( plugins.sassLint.failOnError() );

		done();
	});
};
