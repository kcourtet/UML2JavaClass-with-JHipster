#!/bin/bash

# Output folder
mkdir res/jhuml_generated_classes/
# Input file parameter given by the user
FILE=$1

# JHipster-uml launch with the input file
echo Start && jhipster-uml $FILE && \
cp src/main/java/com/mycompany/myapp/domain/* res/jhuml_generated_classes/ && \
cd res/jhuml_generated_classes/ && ls && echo End
