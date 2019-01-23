'use strict';

import fs              from 'fs-extra';
import fwdref          from 'undertaker-forward-reference';
import gulp            from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import minimist        from 'minimist';
import pjson           from './package.json';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

const defaultNotification = function( err ) {

	return {
		subtitle: err.plugin,
		message:  err.message,
		sound:    'Funk',
		onLast:   true,
	};
};

let config      = Object.assign( {}, pjson.config, defaultNotification ),
    project     = config.project,
    paths       = config.paths,
    args        = minimist( process.argv.slice( 2 ) );

gulp.registry( fwdref() );

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks.
fs.readdirSync( './gulp' ).filter( ( file ) => {

	return ( /\.(js)$/i ).test( file );

}).map( function( file ) {

	require( './gulp/' + file )( gulp, plugins, args, paths, project );
});
