FROM mcr.microsoft.com/playwright:focal
RUN apt-get update; \
    apt-get install -y \
    libu2f-udev;
RUN npx playwright install chrome
COPY ./src /var/www/src/
COPY ./playwright.config.js /var/www/playwright.config.js
WORKDIR /var/www/
CMD ["tail", "-f", "/dev/null"]
