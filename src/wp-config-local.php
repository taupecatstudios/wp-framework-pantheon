<?php

// Set the default (local)

$hostname     = '##URL##';
$scheme       = 'https://';
$db_name      = '##DB_NAME##';
$db_user      = 'root';
$db_password  = 'password';
$db_host      = 'localhost';
$wp_debug     = true;
$table_prefix = '##TABLE_PREFIX##';
$wp_url       = $scheme . $hostname;

define( 'WP_HOME',        $wp_url );
define( 'WP_SITEURL',     WP_HOME . '/wp' );
define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );
define( 'WP_CONTENT_URL', WP_HOME . '/wp-content' );
define( 'DB_NAME',        $db_name );
define( 'DB_USER',        $db_user );
define( 'DB_PASSWORD',    $db_password );
define( 'DB_HOST',        $db_host );
define( 'WP_DEBUG',       $wp_debug );
