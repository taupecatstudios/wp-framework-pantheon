#!/usr/bin/env bash

echo "Provisioning"

DB_NAME="##DB_NAME##"

echo "OS Updates"
apt-get update
apt-get dist-upgrade -y

echo "Installing MariaDB"
debconf-set-selections <<< 'mysql-server mysql-server/root_password password password'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password password'
apt-get -y install mariadb-server
mysql --user=root --password=password -e \
    "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION; FLUSH PRIVILEGES;"
mysqladmin --user=root --password=password create $DB_NAME

echo "Installing nginx"
apt-get install -y nginx

rm /etc/nginx/sites-enabled/default
ln -s /vagrant/scripts/default.conf /etc/nginx/sites-enabled/default

rm /etc/nginx/nginx.conf
ln -s /vagrant/scripts/nginx.conf /etc/nginx/nginx.conf

echo "Installing PHP"
apt-get install -y \
    ghostscript \
    imagemagick \
    php-cli \
    php-curl \
    php-fpm \
    php-gd \
    php-imagick \
    php-json \
    php-mbstring \
    php-memcache \
    php-mysql \
    php-xdebug \
    php-xml

rm /etc/php/7.2/fpm/php.ini
ln -s /vagrant/scripts/php.ini /etc/php/7.2/fpm/php.ini

# Update ImageMagick policies so WordPress can create PDF thumbnail images.
sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/g' /etc/ImageMagick-6/policy.xml
sed -i 's/<\/policymap>/  <policy domain="coder" rights="read|write" pattern="LABEL" \/>\n<\/policymap>/g' /etc/ImageMagick-6/policy.xml

rm /etc/php/7.2/fpm/pool.d/www.conf
ln -s /vagrant/scripts/www.conf /etc/php/7.2/fpm/pool.d/www.conf

echo "Installing PHPUnit"
wget -nv https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
mv phpunit.phar /usr/local/bin/phpunit

echo "Installing WP-CLI"
curl -O -s https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/bin/wp

echo "cd /vagrant/web" >> /home/vagrant/.bashrc
