// 200 - OK
// 201 - resource created
// 404 - not found

// get - fotching some data
// post - creating data
// put/patch - updations
// put - client will send the entire updated object

// in json all the keys have to be strings

//while sending data to client - we are using jsend data specification 

//Home Page resources
// app.get("/", (req, res) => {
//   //res.status(200).send("Hello From the server side 2");
//   res.status(200).json({
//     message: "Hello From the server side",
//     app: "Image service",
//   });
// });

// app.post("/", (req, res) => {
//   res.status(200).json({
//     message: "Your data has been posted successfully",
//     app: "Image service",
//   });
// });

//middleware

//middleware is a function tht can modify incoming request data
// middle ware because it stand between the request and response
// data from bosy is added to the request object

/image resource
//Image Resource
// adding the verb i.e 'get' 'put' etc in the url is a bad practise[/getimage]