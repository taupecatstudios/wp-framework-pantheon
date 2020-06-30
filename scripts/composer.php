<?php

namespace Taupecat_Studios\Composer;

class Install {

	// Current (this) directory.
	private $working_dir;

	// Our web directory (docroot).
	private $web_dir;

	public function __construct() {
		$this->working_dir = __DIR__;
		$this->web_dir     = $this->working_dir . '/../web';

		// Require our file of helper functions.
		require $this->working_dir . '/lib/functions.php';
	}

	public function init() {

		// Make adjustments for "WordPress in a subdirectory."
		$this->install_wordpress_core();

		// Install our common must-use plugins.
		$this->install_mu_plugins();
	}

	private function install_wordpress_core() {

		// Remove files that we don't want in web/wp/.
		$files = [
			$this->web_dir . '/wp/composer.json',
			$this->web_dir . '/wp/readme.html',
			$this->web_dir . '/wp/license.txt',
		];

		foreach ( $files as $file ) {
			if ( file_exists( $file ) ) {
				unlink( $file );
			}
		}

		// Make a copy of web/wp/index.php, modify it as appropriate, and place it
		// in web/.
		$index = file_get_contents( $this->web_dir . '/wp/index.php' );
		$index = str_replace( '/wp-blog-header.php', '/wp/wp-blog-header.php', $index );
		file_put_contents( $this->web_dir . '/index.php', $index );

		// "Silence is golden" files to prevent directory access.
		$silence  = "<?php\n";
		$silence .= "// Silence is golden.\n";

		file_put_contents( $this->web_dir . '/wp-content/index.php', $silence );
		file_put_contents( $this->web_dir . '/wp-content/mu-plugins/index.php', $silence );
		file_put_contents( $this->web_dir . '/wp-content/plugins/index.php', $silence );
		file_put_contents( $this->web_dir . '/wp-content/themes/index.php', $silence );
	}

	private function install_mu_plugins() {
		// Set our source (vendor) and destination (wp-contents) directories.
		$vendor    = __DIR__ . '/../vendor/taupecatstudios/mu-plugins';
		$muplugins = $this->web_dir . '/wp-content/mu-plugins';

		// Copy the ManageWP Worker and WP Migrate DB Pro compatibility must-use
		// plugins.
		copy( $vendor . '/0-worker.php', $muplugins . '/0-worker.php' );
		copy( $vendor . '/wp-migrate-db-pro-compatibility.php', $muplugins . '/wp-migrate-db-pro-compatibility.php' );

		// Delete the existing "taupecatstudios" directory.
		\Taupecat_Studios\remove_directory( $muplugins . '/taupecatstudios' );

		// Copy the "taupecatstudios" directory from vendor.
		mkdir( $muplugins . '/taupecatstudios' );
		\Taupecat_Studios\copy_files( $vendor . '/taupecatstudios', $muplugins . '/taupecatstudios' );

		// Copy the taupecatstudios.php loader file.
		copy( $vendor . '/taupecatstudios.php', $muplugins . '/taupecatstudios.php' );
	}
}

( new Install() )->init();
