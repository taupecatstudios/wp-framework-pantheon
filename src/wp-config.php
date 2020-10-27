<?php
/**
 * This config file is yours to hack on. It will work out of the box on Pantheon
 * but you may find there are a lot of neat tricks to be used here.
 *
 * See our documentation for more details:
 *
 * https://pantheon.io/docs
 */

$project_name = '##PROJECT##';
$live_url     = '##PRODUCTION_DOMAIN##';
$table_prefix = '##TABLE_PREFIX##';

define( 'TC_SITE_LIVE', false );

/**
 * Pantheon platform settings. Everything you need should already be set.
 */
if ( file_exists( __DIR__ . '/wp-config-pantheon.php' ) && isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	require_once __DIR__ . '/wp-config-pantheon.php';

/**
 * Local configuration information.
 *
 * If you are working in a local/desktop development environment and want to
 * keep your config separate, we recommend using a 'wp-config-local.php' file,
 * which you should also make sure you .gitignore.
 */
} elseif ( ( file_exists( __DIR__ . '/wp-config-local.php' ) ) && ( ! isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) ) {
	# IMPORTANT: ensure your local config does not include wp-settings.php
	require_once __DIR__ . '/wp-config-local.php';

/**
 * This block will be executed if you are NOT running on Pantheon and have NO
 * wp-config-local.php. Insert alternate config here if necessary.
 *
 * If you are only running on Pantheon, you can ignore this block.
 */
} else {
	define( 'DB_NAME',          'database_name' );
	define( 'DB_USER',          'database_username' );
	define( 'DB_PASSWORD',      'database_password' );
	define( 'DB_HOST',          'database_host' );
	define( 'DB_CHARSET',       'utf8' );
	define( 'DB_COLLATE',       '' );
	define( 'AUTH_KEY',         'put your unique phrase here' );
	define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
	define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
	define( 'NONCE_KEY',        'put your unique phrase here' );
	define( 'AUTH_SALT',        'put your unique phrase here' );
	define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
	define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
	define( 'NONCE_SALT',       'put your unique phrase here' );
}

/** Standard wp-config.php stuff from here on down. **/

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * You may want to examine $_ENV['PANTHEON_ENVIRONMENT'] to set this to be
 * "true" in dev, but false in test and live.
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/**
 * When we are using WP_DEBUG, we want to write to a log instead of
 * displaying errors on the screen.
 */
if ( WP_DEBUG ) {
	define( 'WP_DEBUG_LOG', __DIR__ . '/../debug.log' );
	define( 'SAVEQUERIES', true );

	/** Jetpack should be in debug mode any time WP_DEBUG is true. */
	if ( ! defined( 'JETPACK_DEV_DEBUG' ) ) {
		define( 'JETPACK_DEV_DEBUG', true );
	}
}

/** ALWAYS turn off displaying errors on the screen. */
ini_set( 'display_errors', 'Off' );
ini_set( 'error_reporting', E_ALL );
if ( ! defined( 'WP_DEBUG_DISPLAY' ) ) {
	define( 'WP_DEBUG_DISPLAY', false );
}

/** Miscellaneous */
if ( ! defined( 'DISALLOW_FILE_EDIT' ) ) {
	define( 'DISALLOW_FILE_EDIT', true );
}

/* That's all, stop editing! Happy Pressing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
