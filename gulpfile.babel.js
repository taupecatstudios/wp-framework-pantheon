'use strict';

import fs              from 'fs-extra';
import fwdref          from 'undertaker-forward-reference';
import gulp4           from 'gulp4';
import gulpLoadPlugins from 'gulp-load-plugins';
import minimist        from 'minimist';
import pjson           from './package.json';
import sequence        from 'run-sequence';

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

gulp4.registry( fwdref() );

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks.
fs.readdirSync( './gulp' ).filter( ( file ) => {

	return ( /\.(js)$/i ).test( file );

}).map( function( file ) {

	require( './gulp/' + file )( gulp4, plugins, args, paths, project );
});
