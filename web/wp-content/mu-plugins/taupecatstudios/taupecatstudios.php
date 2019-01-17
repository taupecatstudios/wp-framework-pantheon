<?php
/**
 * Disabling Jetpack upsell messages.
 */
add_filter( 'jetpack_just_in_time_msgs', '__return_false' );

/**
 * Disable Pantheon Gutenberg notice.
 */
if ( defined( 'DISABLE_PANTHEON_TRY_GUTENBERG_MODS' ) ) {

	define( 'DISABLE_PANTHEON_TRY_GUTENBERG_MODS', false );
}

/**
 * Disable WordPress auto updates
 */
if( ! defined( 'WP_AUTO_UPDATE_CORE' ) ) {

	define( 'WP_AUTO_UPDATE_CORE', false );
}
remove_action( 'wp_maybe_auto_update', 'wp_maybe_auto_update' );

/**
 * Remove the default WordPress core update nag if on Pantheon
 */
function _pantheon_hide_update_nag() {

	remove_action( 'admin_notices', 'update_nag', 3 );
}

if( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {

    add_action('admin_menu','_pantheon_hide_update_nag');
}
