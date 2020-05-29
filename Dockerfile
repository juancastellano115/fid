FROM node:12-alpine
LABEL maintainer="Juan Castellano"
WORKDIR /usr/src/app
COPY . .
RUN apk add git
RUN npm install
RUN npm run build
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["npm","start"]