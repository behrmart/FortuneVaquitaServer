#!/bin/bash
#Script to copy Fortune Server Test directory to Apache server home
# written by @behrmart aka TU PADRE
# stardate 20230817 
echo -e "\e[1mCopy Fortune Server Test home to apache WWW directory\n\e[0m"

# Directories
DEVORIGIN="/home/bernardo/HTMLserver/FortuneServer"
ORIGIN="/home/bernardo/HTMLserver/FortuneServer"
DESTINATION="/var/www/html/Fortune/"

# PHPs
INDEXPHP="index.html"

#JS
JS="test.js"

#Sync Origin Source Directories
 		
echo -e "\n\e[1m\e[5mCopying Files...\e[0m"
        rsync -azP --delete $ORIGIN $DESTINATION

echo -e "Changing www owner  to bernardo..."
		chown -R bernardo:bernardo $ORIGIN

echo -e "Changing owner to www-data..."
		chown -R www-data:www-data $DESTINATION
echo -e "Done."

date
