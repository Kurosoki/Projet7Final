# Projet7

pour faire fonctionner le Projet il faut :

utiliser la commande suivante dans le dossier backend : npm install

Lancer le back avec la commande : nodemon server

créer un fichier .env avec les parametres suivant : SERVER_PORT DBCONNECT ACCESS_TOKEN_SECRET REFRESH_TOKEN_SECRET

utiliser la commande suivante dans le dossier frontend : npm install

cas d'erreur :

npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!

pour régler ce soucis, utiliser la commande suivante : npm i -g npm@latest

si npm install n'install pas tout :

npm install @craco/craco@alpha npm install react-router-dom npm i create-react-app npm i react-image-size npm i formik npm i timeago-react npm i bulma npm install --save @fortawesome/react-fontawesome npm install --save @fortawesome/free-solid-svg-icons npm i --save @fortawesome/fontawesome-svg-core

Lancer le front avec la commande : npm run starto

si un message d'erreur apparait, faite les commandes suivantes :

npm i typescript link typescript npm run starto

PS: En cas d'erreur lié au package timeago.js, cloner le repos d'origine dans le dossier du package du répertoire node_modules : https://github.com/hustcc/timeago.js
