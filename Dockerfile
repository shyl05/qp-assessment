FROM node:alpine

WORKDIR /

COPY package*.json ./

RUN npm install

ENV SERVERPORT=5000
ENV HOST=host.docker.internal
ENV PORT=3306
ENV USER=root
ENV PASSWORD=password
ENV DB=grocery_booking_db
ENV JWT_SECRET=jwt_secret_key

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]