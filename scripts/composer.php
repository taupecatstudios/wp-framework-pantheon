<?php

namespace Taupecat_Studios\Composer;

// Establish the current directory as a constant.
define( 'WORKING_DIR', __DIR__ . '/' );

// Establish '../web' as a constant, since we'll be
// working exclusively within that directory.
define( 'WEB_DIR', WORKING_DIR . '../web/' );

// Remove files that we don't want in web/wp/.
$files = [
	WEB_DIR . 'wp/composer.json',
	WEB_DIR . 'wp/readme.html',
];

foreach ( $files as $file ) {

	if ( file_exists( $file ) ) {

		unlink( $file );
	}
}

// Make a copy of web/wp/index.php, modify it as appropriate, and
// place it in web/.
$index = file_get_contents( WEB_DIR . 'wp/index.php' );
$index = str_replace( '/wp-blog-header.php', '/wp/wp-blog-header.php', $index );
file_put_contents( WEB_DIR . 'index.php', $index );

// "Silence is golden" files to prevent directory access.
$silence = <<<EOT
<?php
// Silence is golden.

EOT;

file_put_contents( WEB_DIR . 'wp-content/index.php', $silence );
file_put_contents( WEB_DIR . 'wp-content/mu-plugins/index.php', $silence );
file_put_contents( WEB_DIR . 'wp-content/plugins/index.php', $silence );
file_put_contents( WEB_DIR . 'wp-content/themes/index.php', $silence );

// wp-cli.yml file to tell Pantheon and WP-CLI where the core files are.
$wp_cli_yml = <<<EOT
path: wp

EOT;

file_put_contents( WEB_DIR . 'wp-cli.yml', $wp_cli_yml );

exit();
