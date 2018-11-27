'use strict';

const autoprefixer  = require( 'autoprefixer' );
const csswring      = require( 'csswring' );

export default function( gulp, plugins, args, config, taskTarget ) {

	const paths = config.paths;

	gulp.task( 'css', [
		'css:lint',
		'css:unminified',
		'css:minified'
	]);

	gulp.task( 'css:lint', function() {

		return gulp.src( paths.sass + '/**/*.scss' )
			.pipe( plugins.sassLint({
				options: {
					formatter: 'stylish',
					'merge-default-rules': true,
				},
				rules: {
					'class-name-format': [
						1,
						{
							convention: 'hyphenatedbem',
						}
					],
					'force-element-nesting': 0,
					'force-pseudo-nesting': 0,
					'function-name-format': [
						1,
						{
							'convention': 'snakecase',
						}
					],
					'indentation': [
						1,
						{
							size: 'tab',
						}
					],
					'leading-zero': [
						1,
						{
							'include': true,
						}
					],
					'mixins-before-declarations': [
						1,
						{
							exclude: [ 'bp', 'hover', 'breakpoint' ],
						}
					],
					'nesting-depth': 0,
					'no-css-comments': 0,
					'no-qualifying-elements': 0,
					'space-between-parens': [
						1,
						{
							'include': true,
						}
					],
				}
			}))
			.pipe( plugins.sassLint.format() )
			.pipe( plugins.sassLint.failOnError() );
	});

	// Unminified, sourcemapped
	gulp.task( 'css:unminified', function() {

		var src   = paths.sass + '/**/*.scss',
			dest  = paths.css;

		gulp.src( src )
			.pipe( plugins.plumber() )
			.pipe( plugins.sourcemaps.init({
				loadMaps: true
			}))
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer()
			]))
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( dest ) )
			.pipe( plugins.livereload() );
	});

	// Minified, not sourcemapped
	gulp.task( 'css:minified', function() {

		var src   = paths.sass + '/**/*.scss',
			dest  = paths.css;

		return gulp.src( src )

			.pipe( plugins.plumber() )
			.pipe( plugins.sass() )
			.pipe( plugins.postcss([
				autoprefixer(),
				csswring()
			]))
			.pipe( plugins.rename({
				suffix: '.min'
			}))
			.pipe( gulp.dest(dest) );
	});
};
