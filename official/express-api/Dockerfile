FROM node:24-alpine
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force \
  && npm uninstall --global npm \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
COPY --chown=node:node server.js ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s CMD wget -qO- http://127.0.0.1:3000/health | grep -q quikdb-template-express-api-v1
CMD ["node", "server.js"]
