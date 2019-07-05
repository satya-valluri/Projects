This is a Chat App.

This has been written with ReactJS + NodeJS + Socket.io

This is mainly helpful for sending text between Laptop and Desktop.

TODO : Support for files / User status / Dockerize it.

How to use it : 
1. Download the Source contents in 'PC-A'
2. cd into "Chat Application" where a package.json will be available. Run npm install.
3. cd into "Client" folder where a package.json will be available. Run npm install.
4. cd back to the 'Chat Application' and run 'npm start'. 
5. Server will listen on port 8080. and React client on port 3000.
6. See Chat In same PC :  Open two browser instances of http://localhost:3000/ and start 'chatting'
7. See chat in different PC's : After executing step 6, go to another 'PC-B' in the same network.
8. Open browser in 'PC-B' and open the URL 'http://ip of PC-A:3000'. And start typing chat messages which you can see in 'PC-A'
