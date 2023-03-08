FROM node:16 AS core
RUN apt-get update; \
    apt-get install -y \
    default-jre; 

COPY functions/package.json functions/package-lock.json /var/www/functions/

# Just need this for the emulate script.
COPY functions/package.json /var/www/
USER root
RUN chmod -R 777 /var/www/functions
USER node
WORKDIR /var/www/functions
# Install dependencies in functions directory
RUN npm ci
WORKDIR /var/www/
CMD ["npm", "run", "emulate"]
EXPOSE 5010 5011 5012

FROM core as develop
COPY functions/index.js /var/www/functions/
# Add custom code.
COPY functions/Custom/ /var/www/functions/Custom/
COPY firebase.json firestore.rules firestore.indexes.json /var/www/
COPY scripts/ /var/www/scripts/
WORKDIR /var/www/

