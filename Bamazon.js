var mysql = require('mysql'); 

var inquirer = require('inquirer');

var connection = mysql.createConnection ({
	host:"localhost",
	port:3306,
	user:"root",
	password:"lup3nd",
	database:"bamazon"
});

connection.connect(function(err) {
	if (err) {
		throw err;
	}
	console.log('Welcome!');
});

var questions = [{
	type:'list',
	name:'firstPrompt',
	message:'What is the ID number of the item that you want to purchase?',
	choices:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
}, {
	type: 'input',
	name: 'secondPrompt',
	message: 'How many units would you like to purchase?'
}];

connection.query('SELECT * FROM products', function(err, res) {
	for(var i = 0; i < res.length; i++) {
		console.log(res[i].itemID + '||' + res[i].productName + '||' + res[i].price + '||' + res[i].stockQuantity);
		console.log('==========================================================');
	}
	
	function promptUsers () {
		inquirer.prompt(questions).then(function(response) {
			var firstChoice = response.firstPrompt;
			//console.log(firstChoice);
			var secondChoice = response.secondPrompt;
	 		//if (firstChoice > 0 && firstChoice <= 10) {
	 			connection.query('SELECT * FROM products WHERE ?', {
	 				itemID: firstChoice
	 			}, function(err, res) {
	 				if(err) {
	 					throw err;
	 				} else {
	 					res.stockQuantity(function(row) {
	 						if(res.stockQuantity > secondChoice) {

	 							console.log('Insufficient Quantity!');
	 							promptUsers();
	 						} else {
	 							console.log('Quantity Available');
	 						}
	 					});
	 				}
	 			})


			//}
	    });
	}

	promptUsers();
});



// var postQuestions = [{
// 	name:
// }]


connection.end();