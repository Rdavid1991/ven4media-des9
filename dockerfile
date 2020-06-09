FROM node:latest

WORKDIR /home/app

RUN wget https://www.imagemagick.org/download/ImageMagick.tar.gz && \ 
    tar xvzf ImageMagick.tar.gz
RUN cd Ima*/  && \ 
    ./configure && \ 
    make && \ 
    make install && \ 
    ldconfig /usr/local/lib

RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz && \ 
    tar -Jxvf ffmpeg*.tar.xz && \ 
    mkdir bin && \ 
    mv ffmpeg*/* bin/

RUN rm -r Ima*   
RUN rm -r ffmpeg*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]