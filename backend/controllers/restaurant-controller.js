const http = require('follow-redirects').http;

// fetching data to get all the restaurants
exports.findRestaurant = function(req, res)
{
  console.log('Inside');
  var search = req.query.searchText;
http.get('http://eatstreet.com/publicapi/v1/restaurant/search?latitude=40.715096&longitude=-74.012268&method=both&access-token=7e701d4fa9952c43&search=' + search,
 (resp) => {

  let data = '';

  // // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', function(){
    console.log(data);
        res.json(JSON.parse(data));
        });
        });
}

// fetching data to get restaurant menu
exports.findRestaurantMenu = function(req, res)
{
  console.log('Inside Menu');
  var apiKey = req.query.apiKey;
  console.log(apiKey);
  //var apiKey  = '7db7db40b47efa8c144247b91fbcb2f3c0ad845ee6ded851';
  http.get('http://eatstreet.com/publicapi/v1/restaurant/'+apiKey+'/menu?includeCustomizations=false&access-token=7e701d4fa9952c43',
 (resp) => {

  console.log('http://eatstreet.com/publicapi/v1/restaurant/'+apiKey+'/menu?includeCustomizations=false&access-token=7e701d4fa9952c43');
  let data = '';

  // // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', function(){
    console.log(data);
        res.json(JSON.parse(data));
        });
        });
}


// fetching data for a particular restaurant (Find Restaurant By Id)
exports.findRestaurantById = function(req, res)
{
  console.log('Inside one Rest');
  var apiKey = req.query.apiKey;
  console.log(apiKey);
  //var apiKey  = '7db7db40b47efa8c144247b91fbcb2f3c0ad845ee6ded851';
  http.get('http://eatstreet.com/publicapi/v1/restaurant/'+apiKey+'?access-token=7e701d4fa9952c43',
 (resp) => {

  console.log('http://eatstreet.com/publicapi/v1/restaurant/'+apiKey+'&access-token=7e701d4fa9952c43');
  let data = '';

  // // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', function(){
    console.log(data);
        res.json(JSON.parse(data));
        });
        });
}
