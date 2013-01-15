nodejs_im
=========

simple im(include DB Server and Client) with NodeJS

how to use
-----------
<pre><code>$ npm install mysql -g
$ node server.js</code></pre>

先用node在console开启一个Server 然后再用console使用telnet  实时发送
没有引入stream…

<pre>in your PC
<code>$ telnet localhost 3104
// then you can send message</code>

in anothor PC<br />
<code>$ telnet [server ip] 3104
// then you can send message</code>
</pre>
