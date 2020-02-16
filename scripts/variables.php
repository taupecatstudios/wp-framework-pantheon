<?php

namespace Taupecat_Studios\Configure;

$project = 'wp-framework';

$variables = array(
	'##PROJECT##'           => $project,
	'##PROJECT_NAME##'      => 'WP Framework',
	'##DB_NAME##'           => 'wpframework_site_dev',
	'##TABLE_PREFIX##'      => 'wpframework_wp_',
	'##DESCRIPTION##'       => 'The foundation for WordPress projects.',
	'##HOSTNAME##'          => $project . '-site',
	'##URL##'               => $project . '.local',
	'##PRODUCTION_DOMAIN##' => $project . '.com',
	'##TEXTDOMAIN##'        => 'textdomain',
	'##VARPREFIX##'         => 'varprefix',
	'##PACKAGE##'           => 'Package Name',
	'##CLASSNAME##'         => 'Class_Name',
	'##WPMDBPRO_USERNAME##' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
	'##WPMDBPRO_PASSWORD##' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
);
