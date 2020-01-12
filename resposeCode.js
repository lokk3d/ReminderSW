require("dotenv").config();
const axios = require("axios")


function resCode(code) {
  const url = 'http://localhost:5000/api/codes/'+code
  console.log(url);

  return axios.get(url,
    { headers: { authorization: "Bearer " + process.env.ADMIN_AUTH } })
    .then(res =>  {
      console.log(res.data);
      return res.data; 
    })
    .catch(err => {
      console.log("Err" + err)
    });

}

module.exports = resCode