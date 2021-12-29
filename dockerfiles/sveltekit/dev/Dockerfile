FROM node:14
RUN apt-get update; \
    apt-get install -y \
    default-jre; 
COPY . /var/www/
RUN chmod -R 777 /var/www/svelte
WORKDIR /var/www/svelte/functions
USER node
RUN npm ci
WORKDIR /var/www/svelte/
RUN npm ci;
USER root
RUN npx playwright install;\
  npx playwright install chrome;
EXPOSE 3000
ENV PATH /var/www/svelte/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]

# CMD ["tail", "-f", "/dev/null"]
