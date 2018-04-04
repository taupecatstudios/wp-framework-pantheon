# WP Framework

Custom WordPress upstream for local development intended for hosting with [Pantheon](https://pantheon.io). This repository is intended for employees and contractors of Taupecat Studios and relies on AWS access for setup.

## Use on `localhost`

1. Clone this repository.
2. Change the variables in `/scripts/variables.bash` as necessary.
3. `/scripts/configure`
3. `npm install`
3. `composer update`
4. `vagrant up`
5. `vagrant ssh`
6. `cd /vagrant/scripts`
7. `./https.bash`
8. Answer the prompts with the defaults. Enter the certificate password.

## Post-Installation

New WordPress projects are created based on [Underscores](https://underscores.me). Create your starter theme there and integrate it into the `/src/` directory. Instructions TK.

## Other Notes

While this is intended for use with projects for Taupecat Studios, feel free to fork and modify for your own projects.
