/**
 * css
 *
 * Lint and process Sass into CSS
 */

import autoprefixer from 'autoprefixer';
import cssnano      from 'cssnano';
import Fiber        from 'fibers';

export default ( gulp, plugins, args, paths, project ) => {

	plugins.sass.compiler = require( 'sass' );

	const src = [
		paths.srcSass + '/**/*.scss',
		'!' + paths.srcSass + '/**/woocommerce/woocommerce.scss',
	];

	const tasks = [ 'css:compile', 'css:lint' ];

	gulp.task( 'css', gulp.parallel( tasks ) );

	gulp.task( 'css:compile', ( done ) => {

		gulp.src( src )
			.pipe( plugins.plumber() )
			.pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
			.pipe( plugins.sass( { fiber: Fiber } ).on( 'error', plugins.sass.logError ) )
			.pipe( plugins.postcss([
				autoprefixer( { grid: true } ),
				cssnano()
			]))
			.pipe( plugins.rename({
				basename: project,
				suffix: '.min'
			}))
			.pipe( plugins.sourcemaps.write( './' ) )
			.pipe( gulp.dest( paths.webCss ) )
			.on( 'end', () => {
				plugins.livereload.reload( paths.webCss + '/' + project + '.min.css' );
			})
		;

		done();
	});

	gulp.task( 'css:lint', ( done ) => {

		gulp.src( src )
			.pipe( plugins.stylelint({
				configFile: paths.srcSass + '/.stylelintrc.json',
				reporters: [ { formatter: 'string', console: true } ],
				failAfterError: false
			}))
		;

		done();
	});
};
