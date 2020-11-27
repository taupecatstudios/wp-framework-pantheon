<?php
/**
 * Pantheon platform settings.
 */

/** MySQL settings - included in the Pantheon Environment */

/** The name of the database for WordPress */
define( 'DB_NAME', $_ENV['DB_NAME'] );

/** MySQL database username */
define( 'DB_USER', $_ENV['DB_USER'] );

/** MySQL database password */
define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );

/** MySQL hostname; on Pantheon this includes a specific port number. */
define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Changing these will force all users to have to log in again.
 * Pantheon sets these values for you. If you want to shuffle them you must
 * contact support: https://pantheon.io/docs/getting-support
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         $_ENV['AUTH_KEY'] );
define( 'SECURE_AUTH_KEY',  $_ENV['SECURE_AUTH_KEY'] );
define( 'LOGGED_IN_KEY',    $_ENV['LOGGED_IN_KEY'] );
define( 'NONCE_KEY',        $_ENV['NONCE_KEY'] );
define( 'AUTH_SALT',        $_ENV['AUTH_SALT'] );
define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
define( 'LOGGED_IN_SALT',   $_ENV['LOGGED_IN_SALT'] );
define( 'NONCE_SALT',       $_ENV['NONCE_SALT'] );
/**#@-*/

/** A couple extra tweaks to help things run well on Pantheon. **/

/** Set a default value for the WP_ENVIRONMENT_TYPE constant. **/
$wp_environment = 'development';

switch ( $_ENV['PANTHEON_ENVIRONMENT'] ) {

	case 'live':
		$wp_environment = 'production';
		$primary_domain = 'live-' . $project_name . '.pantheonsite.io';
		if ( TC_SITE_LIVE ) {
			$primary_domain = $live_url;
		}
		break;

	case 'test':
		$wp_environment = 'staging';
		$primary_domain = 'test-' . $project_name . '.pantheonsite.io';
		break;

	case 'lando':
		$primary_domain = $project_name . '.lndo.site';
		define( 'WP_DEBUG', true );
		break;

	default:
		$primary_domain = sprintf(
			'%1$s-%2$s.pantheonsite.io',
			$_ENV['PANTHEON_ENVIRONMENT'],
			$project_name
		);
		break;
}

if ( false === getenv( 'WP_ENVIRONMENT_TYPE' ) ) {
	putenv( 'WP_ENVIRONMENT_TYPE=' . $wp_environment );
}

$base_url = 'https://' . $primary_domain;

define( 'WP_HOME',        $base_url );
define( 'WP_SITEURL',     WP_HOME . '/wp' );
define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );
define( 'WP_CONTENT_URL', WP_HOME . '/wp-content' );

/** Always-on HTTPS */
if ( ( 'cli' !== php_sapi_name() ) && ( ! isset( $_SERVER['LANDO_WEBROOT'] ) ) ) {

	$_SERVER['HTTPS'] = 'on';

	if ( ( $primary_domain !== $_SERVER['HTTP_HOST'] ) || ( ! isset( $_SERVER['HTTP_X_SSL'] ) ) || ( 'ON' !== $_SERVER['HTTP_X_SSL'] ) ) {
		header( 'HTTP/1.0 301 Moved Permanently' );
		header( 'Location: ' . $base_url . $_SERVER['REQUEST_URI'] );
		exit;
	}
}

/** Don't show deprecations; useful under PHP 5.5 */
error_reporting( E_ALL ^ E_DEPRECATED );

/** Define appropriate location for default tmp directory on Pantheon */
define( 'WP_TEMP_DIR', $_SERVER['HOME'] . '/tmp' );

/** Make sure Jetpack is always in debug mode in non-production environments */
if ( ( 'production' !== $wp_environment ) && ( ! defined( 'JETPACK_DEV_DEBUG' ) ) ) {
	define( 'JETPACK_DEV_DEBUG', true );
}
