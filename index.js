const express = require('express')
const ejs = require('ejs');
const path = require("path");
var validator = require('validator');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 7000;
app.use(express.json());  // recognize the incoming Request object as a JSON object
app.set('view engine', 'ejs');
const mongoose = require("./conn.js");
const UserData = require("./schema.js");
const { json } = require('body-parser');
const { read } = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/save', async (req, res) => {
  console.log(req.body);
  //console.log(req.body.address.country)

  if (!validator.isAlpha(req.body.first_name)) {
    return res.status(400).json({ response: 'Invalid first name' });
  }
  if (!validator.isAlpha(req.body.last_name) ) {
    return res.status(400).json({ response: 'Invalid last name' });
  }

  if (!validator.isMobilePhone(req.body.phone_no, "en-IN")) {
    //throw new Error('Invalid mobile number!');
    return res.status(400).json({ response: 'Invalid mobile no' });
  }
  
  // if (!validator.isAlpha(req.body.address.city)) {
  //   //throw new Error('Invalid mobile number!');
  //   return res.status(400).json({ response: 'Enter valid city'});
  // }

  // if (!validator.isAlpha(req.body.address.state)) {
  //   return res.status(400).json({ response: 'Enter valid state'});
  // }
  // if (!validator.isAlpha(req.body.address.country)) {
  //   return res.status(400).json({ response: 'Enter valid country'});
  // }

  if (!validateUsername(req.body.login_id)) {
    return res.status(400).json({ response: 'Invalid username' });
  }
  if (!validator.isStrongPassword(req.body.password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
    return res.status(400).json({ response: 'Invalid password' });
  }

  let datainfo = new UserData(req.body);
  console.log("DATA IS" + datainfo);
  //await datainfo.save();
  res.json(datainfo);
});


app.get('/view', (req, res) => {
  UserData.find({}, (err, result) => {
    if (err) throw err;
    res.render('index', {
      dataList: result
    })
  })
})

// Validates a username
function validateUsername(username) {
  return !validator.isEmpty(username) && validator.isAlphanumeric(username) && validator.isLength(username, { min: 6, max: 32 });
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})