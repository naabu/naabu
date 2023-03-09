FROM node:16 AS core
RUN apt-get update; \
    apt-get install -y \
    default-jre; 

COPY dockerfiles/firebase/package.json /usr/local/package.json
RUN chmod -R 777 /usr/local/
USER node
WORKDIR /usr/local/
RUN npm install && \
    npm set audit false
USER root
ENV PATH /usr/local/node_modules/.bin:$PATH
COPY functions/package.json functions/package-lock.json /var/www/functions/
WORKDIR /var/www/functions
RUN chmod -R 777 /var/www/functions
USER node
RUN npm ci
USER root
CMD ["npm", "run", "emulate"]
EXPOSE 5010 5011 5012

FROM core as develop
COPY functions/index.js /var/www/functions/
# Add custom code.
COPY functions/Custom/ /var/www/functions/Custom/
COPY firebase.json firestore.rules firestore.indexes.json /var/www/
COPY scripts/ /var/www/scripts/
WORKDIR /var/www/

