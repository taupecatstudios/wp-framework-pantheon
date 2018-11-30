/**
 * Linting
 */

export default ( gulp4 ) => {

	// gulp4.task( 'lint', gulp4.parallel( [ 'css:lint', 'js:eslint' ] ) );
	gulp4.task( 'lint', gulp4.parallel( [ 'css:lint', 'js:eslint', 'php:lint' ] ) );
};
