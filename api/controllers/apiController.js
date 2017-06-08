module.exports = {
  webhook:function (req, res) {//facebook token
    if (req.query['hub.verify_token'] === 'verify-token') {
  			res.send(req.query['hub.challenge']);

  	} else {
  			res.send('Invalid verify token');
  	}
  },

  accesstoken:function(req, res){//twitter token

  },
}
