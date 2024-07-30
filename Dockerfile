FROM node:20-alpine as dev

WORKDIR /app

COPY . .

RUN npm install
RUN npm install @angular/cli -g

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll=2000", "--disable-host-check"]


#####   PRODUCTION   #####
# FROM node:20-alpine AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

# COPY . .

# RUN npm run build

# FROM nginx:stable

# COPY --from=build /app/dist/angular_test/browser /usr/share/nginx/html

# EXPOSE 80

