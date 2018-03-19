#!/bin/bash

IMAGE=kcourtet/jhuml:v1.1
XMI=$1

docker run --rm -it -v $JHINPUT:/home/jh/data $IMAGE echo start && \
jhipster-uml $XMI && \

echo your java entity files have been generated.
cd src/main/java/com/mycompany/myapp/domain/ && ls 
echo end
