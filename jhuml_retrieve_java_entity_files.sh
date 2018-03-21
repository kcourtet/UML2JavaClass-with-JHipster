#!/bin/bash

# Input file parameter given by the user
FILE=$1
OUT=$2

# JHipster-uml launch with the input file
echo Start && jhipster-uml $FILE 

mkdir output
if [ -z $OUT ]
  then 
      cp src/main/java/com/mycompany/myapp/domain/* output/ 
      cd output/ && ls
  else
      mkdir $OUT
      cp src/main/java/com/mycompany/myapp/domain/* $OUT/
      rm -r output/
      cd $OUT/ && ls
fi

echo End
