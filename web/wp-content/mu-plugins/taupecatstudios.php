<?php
/*!
 * Plugin Name: Taupecat Studios
 * Plugin URI: https://taupecatstudios.com/
 * Description: Optimizing for Pantheon, plus a few other niceties.
 * Author: Taupecat Studios & Pantheon
 * Author URI: https://taupecatstudios.com/
 */

if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {

	require_once( 'taupecatstudios/pantheon-page-cache.php' );
	// require_once( 'taupecatstudios/pantheon-updates.php' );
	require_once( 'taupecatstudios/pantheon-login-form-mods.php' );
	require_once( 'taupecatstudios/pantheon-try-gutenberg-mods.php' );

} // Ensuring that this is on Pantheon

/**
 * Taupecat Studios modifications
 */

require_once( 'taupecatstudios/taupecatstudios.php' );
