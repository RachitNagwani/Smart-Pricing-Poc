# Use PM2 to serve Angular build
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration=production

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist/region_frontend/browser ./dist
RUN npm install -g pm2
EXPOSE 80
CMD ["pm2", "serve", "dist", "--spa", "--no-daemon", "--port", "80"]