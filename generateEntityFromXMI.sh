#!/bin/bash

IMAGENAME="jh-uml-wrapper"
 
XMIFILE="/input/lab3.xmi" 

rm -rf output/domain

docker run  -it --rm -v $PWD/input:/input    -v $PWD/output:/output -v $PWD/conf/src:/home/jh/data/src -v $PWD/conf/.yo-rc.json:/home/jh/data/.yo-rc.json  $IMAGENAME bash -c "jhipster-uml --db sql  $XMIFILE ; cp -r  /home/jh/data/src/main/java/com/mycompany/myapp/domain /output/; chmod -R 777 /output/"

ls -l output/domain
