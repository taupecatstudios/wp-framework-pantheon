/**
 * Linting
 */

export default ( gulp ) => {

	gulp.task( 'lint', gulp.parallel( [ 'css:lint', 'js:eslint', 'php:lint' ] ) );
};
