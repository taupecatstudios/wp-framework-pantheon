'use strict';

import appRoot         from 'app-root-path';
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

const config  = Object.assign( {}, pjson.config, defaultNotification ),
      project = config.project,
      paths   = { base: appRoot.path },
      args    = minimist( process.argv.slice( 2 ) );

// Fill out our paths object.
paths.node      = paths.base + '/node_modules';
paths.src       = paths.base + '/src';
paths.srcSass   = paths.src + '/sass';
paths.srcJs     = paths.src + '/js';
paths.srcPlugin = paths.src + '/plugin';
paths.srcTheme  = paths.src + '/theme';
paths.web       = paths.base + '/web';
paths.webTheme  = paths.web + '/wp-content/themes/' + config.project;
paths.webCss    = paths.webTheme + '/css';
paths.webJs     = paths.webTheme + '/js';
paths.webPlugin = paths.web + '/wp-content/mu-plugins/' + config.project;

gulp.registry( fwdref() );

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks.
fs.readdirSync( './gulp' ).filter( ( file ) => {

	return ( /\.(js)$/i ).test( file );

}).map( function( file ) {

	require( './gulp/' + file )( gulp, plugins, args, paths, project );
});
