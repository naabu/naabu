FROM node:14 
COPY package.json /var/www/
RUN chmod -R 777 /var/www/
USER node
WORKDIR /var/www/
RUN npm install --save-dev \
 && npm set audit false
ENV PATH /var/www/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]
EXPOSE 3000
