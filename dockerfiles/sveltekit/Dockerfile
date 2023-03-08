FROM node:16 as core
COPY package.json /var/www/
COPY package-lock.json /var/www/
RUN chmod -R 777 /var/www/
USER node
WORKDIR /var/www/
RUN npm ci \
 && npm set audit false
ENV PATH /var/www/node_modules/.bin:$PATH
CMD ["npm", "run", "dev"]
EXPOSE 3000

FROM core as develop
COPY . /var/www/
USER root
WORKDIR /var/www/
