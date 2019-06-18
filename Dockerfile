FROM node:10-alpine

ENV NODE_SOURCE /usr/src
WORKDIR $NODE_SOURCE

ADD . $NODE_SOURCE/
# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js

EXPOSE 3000
CMD ["yarn", "start"]