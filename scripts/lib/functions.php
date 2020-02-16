<?php
/**
 * Supporting functions.
 */

namespace Taupecat_Studios;

// Recursively chmod files to 0644.
function chmod_files( $path ) {

	if ( file_exists( $path ) ) {

		$files = array_diff( scandir( $path ), array( '.', '..' ) );

		foreach ( $files as $file ) {

			if ( is_dir( $path . '/' . $file ) ) {

				chmod_files( $path . '/' . $file );

			} else {

				chmod( $path . '/' . $file, 0644 );
			}
		}
	}

	return;
}

// Recursively copy files.
function copy_files( $source, $dest ) {

	foreach (
		$iterator = new \RecursiveIteratorIterator(
			new \RecursiveDirectoryIterator( $source, \RecursiveDirectoryIterator::SKIP_DOTS ),
			\RecursiveIteratorIterator::SELF_FIRST
		) as $item
	) {
		if ( $item->isDir() ) {
			mkdir( $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName() );
		} else {
			copy( $item, $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName() );
		}
	}

	return;
}

// Pull down objects from AWS S3
function copy_from_s3( $s3 ) {

	foreach ( $s3['files'] as $source => $destination ) {

		try {

			$result = $s3['client_info']->getObject([
				'Bucket' => 'taupecatstudios',
				'Key'    => $source,
			]);

			file_put_contents( $destination, $result['Body'] );

			if ( 'prepare-commit-msg' === $source ) {

				chmod( $destination, 0755 );
			}

		} catch ( S3Exception $e ) {

			echo $e->getMessage() . PHP_EOL;
		}
	}

	return;
}

// Find and replace placeholder strings.
function find_and_replace( $variables ) {

	$directory = WORKING_DIR . '..';

	$iterator = new \RecursiveIteratorIterator( new \RecursiveDirectoryIterator( $directory ) );

	$iterator->rewind();

	while ( $iterator->valid() ) {

		$process = true;

		if ( $iterator->isDot() )                                  $process = false;
		if ( preg_match( '/^\.git/', $iterator->getSubPath() ) )   $process = false;
		if ( preg_match( '/variables\.php$/', $iterator->key() ) ) $process = false;
		if ( 0 === filesize( $iterator->key() ) )                  $process = false;

		if ( $process ) {

			$key = $iterator->key();
			$file_array = file( $key );

			foreach ( $variables as $placeholder => $value ) {

				$file_array = preg_replace( "/$placeholder/", $value, $file_array );
				$handle = fopen( $key, 'w' );
				fwrite( $handle, join( $file_array ) );
			}
		}

		$iterator->next();
	}

	return;
}

// Recursively remove directories with files in them.
function remove_directory( $path ) {

	if ( file_exists( $path ) ) {

		$files = array_diff( scandir( $path ), array( '.', '..' ) );

		foreach ( $files as $file ) {

			if ( is_dir( $path . '/' . $file ) ) {

				remove_directory( $path . '/' . $file );

			} else {

				unlink( $path . '/' . $file );
			}
		}

		rmdir( $path );
	}

	return;
}
