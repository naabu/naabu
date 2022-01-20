FROM mcr.microsoft.com/playwright:focal
RUN apt-get update; \
    apt-get install -y \
    curl \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    wget \
    libu2f-udev;
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb
RUN npx playwright install chrome
COPY ./src /var/www/src/
COPY ./playwright.config.js /var/www/playwright.config.js
WORKDIR /var/www/
RUN npm install -D @playwright/test
CMD ["tail", "-f", "/dev/null"]
