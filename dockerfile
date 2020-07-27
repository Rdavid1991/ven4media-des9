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

RUN apt update

RUN apt install -y python-pip

RUN pip install nudepy

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]