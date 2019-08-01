#! /bin/bash

RUN=$1
if [ $RUN == 'stop' -o $RUN == 'status' -o $RUN == 'delete' ]; then
  pm2 $RUN reactapp
  exit 0
fi

npm run build
if [ $RUN == 'start' ]; then
  PORT=8081 pm2 start ./node_modules/react-scripts/scripts/start.js --name "reactapp"
fi

if [ $RUN == 'restart' ]; then
  pm2 $RUN reactapp
fi
