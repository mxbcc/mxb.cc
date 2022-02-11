FROM node:16.14.0-alpine3.15
MAINTAINER miaowing <me@mxb.cc>

ENV NODE_ENV production

WORKDIR /usr/src/app

ADD package.json ./package.json
ADD node_modules ./node_modules
ADD .next ./.next
ADD next.config.js ./next.config.js

CMD ["npm","start"]

EXPOSE 3000
