// const mysql = require('serverless-mysql');

// const connection = mysql({
// 	config: {
// 		// host: process.env.MYSQL_HOST,
// 		// database: process.env.MYSQL_DATABASE,
// 		// user: process.env.MYSQL_USER,
// 		// password: process.env.MYSQL_PASSWORD,
// 		// port: process.env.MYSQL_PORT,
// 		host: 'staging.mysql.radinfluencer.com',
// 		user: 'zumby@app-mysql',
// 		password: 'y94Ng924t8bw9Qa06388Fx29',
// 		database: 'adamigo',
// 	},
// });

// const query = async (query) => {
// 	try {
// 		const results = await connection.query(query);
// 		await connection.end();
// 		return results;
// 	} catch (error) {
// 		return { error };
// 	}
// };

// export { connection, query };

import mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'staging.mysql.radinfluencer.com',
	user: 'zumby@app-mysql',
	password: 'y94Ng924t8bw9Qa06388Fx29',
	database: 'adamigo',
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

const queryDB = (req, sql, args) =>
	new Promise((resolve, reject) => {
		req.mysqlDb.query(sql, args, (err, rows) => {
			if (err) return reject(err);
			rows.changedRows || rows.affectedRows || rows.insertId
				? resolve(true)
				: resolve(rows);
		});
	});

export default connection;
