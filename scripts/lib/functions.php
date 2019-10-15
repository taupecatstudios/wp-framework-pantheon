<?php
/**
 * Supporting functions.
 */

namespace Configure;

// Recursively remove directories with files in them.
function removeDirectory( $path ) {

	if ( file_exists( $path ) ) {

		$files = glob( $path . '/*' );

		foreach ( $files as $file ) {

			if ( is_dir( $file ) ) {

				removeDirectory( $file );

			} else {

				unlink( $file );
			}
		}

		rmdir( $path );
	}

	return;
}

// Recursively copy files.
function copyFiles( $source, $dest ) {

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

// Find and replace placeholder strings.
function findAndReplace( $strings ) {

	foreach ( $strings as $string ) {

		foreach ( $string as $filename => $replacement ) {

			$file_contents = file_get_contents( $filename );
			$file_contents = str_replace( $replacement[0], $replacement[1], $file_contents );
			file_put_contents( $filename, $file_contents );
		}
	}

	return;
}

// Find and replace placeholder strings, Underscores edition.
function findAndReplaceUnderscores( $path, $strings ) {

	$files = glob( $path . '/*' );

	foreach ( $files as $file ) {

		if ( is_dir( $file ) ) {

			findAndReplaceUnderscores( $file, $strings );

		} else {

			$file_info = new \finfo( FILEINFO_MIME );
			$mime_type = $file_info->buffer( file_get_contents( $file ) );
			if ( strstr( $mime_type, 'text/' ) ) {

				foreach ( $strings as $string ) {

					foreach ( $string as $find => $replace ) {

						$file_contents = file_get_contents( $file );
						$file_contents = str_replace( $find, $replace, $file_contents );
						file_put_contents( $file, $file_contents );
					}
				}
			}
		}
	}

	return;
}

// Pull down objects from AWS S3
function copyFromS3( $s3 ) {

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
