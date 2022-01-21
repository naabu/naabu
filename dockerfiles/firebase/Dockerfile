FROM ghcr.io/naabu/front_firebase-core:v0.0.1
COPY functions/index.js /var/www/functions/
COPY functions/Custom/ /var/www/functions/Custom/
COPY firebase.json firestore.rules firestore.indexes.json /var/www/
COPY scripts/ /var/www/scripts/
RUN cp /usr/local/package.json /var/www/package.json
WORKDIR /var/www/
