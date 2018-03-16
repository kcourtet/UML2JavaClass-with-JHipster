#!/bin/bash

IMAGE=kcourtet/jhuml:v1.1
JHINPUT=$PWD
JHOUTPUT=$PWD/jhuml_generated_class
XMI="jhtest.xmi"

docker run --rm -it -v $JHINPUT:/home/jh/data $IMAGE echo start && \
jhipster-uml $XMI && \
cp src/main/java/com/mycompany/myapp/domain/* jhuml_generated_class/ && \
cd jhuml_generated_class/ && \


echo end

