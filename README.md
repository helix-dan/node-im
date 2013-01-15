nodejs_im
=========

simple im(include DB Server and Client) with NodeJS

how to use
-----------
$ npm install mysql -g
$ node server.js

先用node在console开启一个Server 然后再用console使用telnet  实时发送
#没有引入stream….

in your PC
$ telnet localhost 3104
# then you can send message

in anothor PC
$ telnet [server ip] 3104
# then you can send message
