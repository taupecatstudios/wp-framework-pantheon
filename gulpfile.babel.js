'use strict';

import path             from 'path';
import gulp             from 'gulp';
import gulpLoadPlugins  from 'gulp-load-plugins';
import pjson            from './package.json';
import minimist         from 'minimist';
import wrench           from 'wrench';
import sequence         from 'run-sequence';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

const defaultNotification = function(err) {

	return {
		subtitle: err.plugin,
		message: err.message,
		sound: 'Funk',
		onLast: true,
	};
};

let config      = Object.assign( {}, pjson.config, defaultNotification );
let args        = minimist( process.argv.slice( 2 ) );
let paths       = config.paths;
let taskTarget  = paths.src;

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive( './gulp' ).filter( ( file ) => {

	return ( /\.(js)$/i ).test( file );

}).map( function( file ) {

	require( './gulp/' + file )( gulp, plugins, args, config, taskTarget );
});

// Server tasks with watch
gulp.task( 'serve', ( callback ) => {

	sequence(
		'default',
		callback
	);
});
