FROM php:7.0-apache

COPY . /var/www/html/

RUN docker-php-ext-install pdo pdo_mysql mysqli