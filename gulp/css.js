/**
 * css
 *
 * Lint and process Sass into CSS
 */

'use strict';

import autoprefixer from 'autoprefixer';
import csswring     from 'csswring';

export default ( gulp4, plugins, args, paths ) => {

	const tasks = [ 'css:unminified', 'css:minified' ];

	if ( ! args['production'] ) {

		tasks.push( 'css:lint' );
	}

	gulp4.task( 'css', gulp4.series( tasks ) );

	// Unminified, sourcemapped
	gulp4.task( 'css:unminified', () => {

		return gulp4.src( paths.src_css + '/**/*.scss' )
			.pipe( plugins.plumber() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer()
			]))
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp4.dest( paths.dest_css ) )
			.pipe( plugins.livereload() );
	});

	// Minified, not sourcemapped
	gulp4.task( 'css:minified', () => {

		return gulp4.src( paths.src_css + '/**/*.scss' )

			.pipe( plugins.plumber() )
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer(),
				csswring()
			]))
			.pipe( plugins.rename({
				suffix: '.min'
			}))
			.pipe( gulp4.dest( paths.dest_css ) );
	});

	gulp4.task( 'css:lint', () => {

		return gulp4.src( paths.src_css + '/**/*.scss' )
			.pipe( plugins.sassLint({
				options: {
					formatter: 'stylish',
					'merge-default-rules': true,
				},
				configFile: '.sass-lint.json'
			}))
			.pipe( plugins.sassLint.format() )
			.pipe( plugins.sassLint.failOnError() );
	});
};
