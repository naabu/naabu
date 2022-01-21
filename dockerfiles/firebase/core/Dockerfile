FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 

COPY dockerfiles/firebase/core/package.json /usr/local/package.json
COPY dockerfiles/firebase/core/package-lock.json /usr/local/package-lock.json
RUN chmod -R 777 /usr/local/
USER node
RUN npm ci --global
USER root
ENV PATH /usr/local/node_modules/.bin:$PATH
COPY functions/package.json functions/package-lock.json /var/www/functions/
WORKDIR /var/www/functions
RUN chmod -R 777 /var/www/functions
USER node
RUN npm ci
USER root
CMD ["tail", "-f", "/dev/null"]
EXPOSE 5010 5011 5012
