<?php

namespace Configure;

$project           = 'wp-framework';
$project_name      = 'WP Framework';
$db_name           = 'wpframework_site_dev';
$table_prefix      = 'wpframework_wp_';
$description       = 'The foundation for WordPress projects.';
$hostname          = $project . '-site';
$url               = $project . '.local';
$production_domain = $project . '.com';
$wpmdbpro_username = '';
$wpmdbpro_password = '';

// Underscores variables.
$text_domain      = "'" . $project . "'"; // With single quotes
$function_names   = $project . '_';
$css              = 'Text Domain: ' . $project;
$docblocks        = ' ' . $project;
$prefixed_handles = $project . '-';
