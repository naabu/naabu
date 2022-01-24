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
RUN apt install -y ./google-chrome-stable_current_amd64.deb
RUN npx playwright install chrome
COPY ./dockerfiles/playwright/core/package.json /var/www/package.json
COPY ./dockerfiles/playwright/core/package-lock.json /var/www/package-lock.json
WORKDIR /var/www/
RUN npm ci
CMD ["tail", "-f", "/dev/null"]
