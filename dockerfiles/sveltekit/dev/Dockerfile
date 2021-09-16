FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 
COPY . /var/www/
WORKDIR /var/www/svelte/
RUN chmod -R 777 /var/www/svelte
USER node
RUN npm install
EXPOSE 3000
ENV PATH /var/www/svelte/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]

# CMD ["tail", "-f", "/dev/null"]
