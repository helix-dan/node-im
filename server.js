console.log("start open server and connect to database");

// 引入 net 包, 创建Server
var net = require('net');
var imServer = net.createServer();
var im_clients = [];

// 引入MySQL npm, 创建连接, 以全局变量的形式
var db_client = require('mysql').createClient({'host':'localhost','port':3306,'user':'root','password':''});

TEST_DATABASE = 'nodejs',
TEST_TABLE = 'im_content_records';

// 开启 Server
imServer.on('connection',function(im_client)
                           {
                                // 初始化客户端, 加入客户端Array
                                im_clients.push(im_client);
                                im_client.name = '[' + im_client.remoteAddress + ':' + im_client.remotePort + ']';
                                send_message(im_client.name + ' come in\r\n', im_client);

                                im_client.on('data',function(data)
                                                {
                                                    send_message(im_client.name + ':' + data + '\r\n', im_client);
                                                }
                                         );

                                // 某客户端连接关闭
                                im_client.on('end',function()
                                                {
                                                    send_message(im_client.name + ' left!\r\n', im_client);
                                                    im_clients.splice(im_clients.indexOf(im_client),1);
                                                }
                                         );
                            }
              )

// 提示
console.log("server startup success!");
console.log("database connection success!");

// 客户端发送信息
function send_message(message, im_client)
{
    im_client_count = im_clients.length;
    for(var i=0; i<im_client_count; i++)
    {
        if(im_client!=im_clients[i])
        {
            im_clients[i].write(message);
            db_client.query('USE nodejs '); 
            db_client.query(
              'INSERT INTO im_content_records '+  
              'SET client_name = ?, content = ?',  
              [im_client.name, message]  
            );  
            console.log("the content record saved success!");
        }
    }
}

imServer.listen(3104);
