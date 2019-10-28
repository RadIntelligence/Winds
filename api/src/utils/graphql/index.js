import { makeExecutableSchema } from 'graphql-tools';
const graphqlHTTP = require('express-graphql');
import { queryDB } from '../mysql';
// import { query as mysqlQuery } from '../mysql';
// const { buildSchema } = require('graphql');
// const mysql = require('mysql');
const campaignData = require('../../data/campaigns.json');

// GQL > Start
// Some fake data
const books = [
	{
		title: "Harry Potter and the Sorcerer's stone",
		author: 'J.K. Rowling',
	},
	{
		title: 'Jurassic Park',
		author: 'Michael Crichton',
	},
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    books: [Book]
    getUsers: [User]
    getUserInfo(id: Int) : User
    getCampaigns: [Campaign]
  }
  type Book { 
    title: String
    author: String 
  }
  type User {
    id: String
    name: String
    job_title: String
    email: String
  }
  type Campaign {
    publisherid: String
    SITEID: Int
    FEEDID: Int
    topdomain: String
    campaignname: String
    sitename: String
    license: String
    feedurl: String
    budget: Float
    active: Boolean
    paused: Boolean
    sponsored: Boolean
    creationtime: String
    pattern: String
  }
  type Mutation {
    updateUserInfo(id: Int, name: String, email: String, job_title: String) : Boolean
    createUser(name: String, email: String, job_title: String) : Boolean
    deleteUser(id: Int) : Boolean
  }
`;

const root = {
	getCampaigns: (args, req) => {
		const results = campaignData.data;
		console.log('RESULTS', results);
		return results;
		// try {
		// 	const results = await mysqlQuery('select * from campaigns');
		// 	console.log('RESULTS', results);
		// 	return results;
		// } catch (error) {
		// 	throw error;
		// }
	},

	// mysqlQuery('select * from campaigns').then((data) => {
	// 	console.log('DATA IS: ', data);
	// 	data;
	// }),

	// queryDB(req, 'select * from campaigns').then((data) => {
	// 	console.log('DATA IS: ', data);
	// 	data;
	// }),

	getUsers: (args, req) => queryDB(req, 'select * from users').then((data) => data),
	getUserInfo: (args, req) =>
		queryDB(req, 'select * from users where id = ?', [args.id]).then(
			(data) => data[0],
		),
	updateUserInfo: (args, req) =>
		queryDB(req, 'update users SET ? where id = ?', [args, args.id]).then(
			(data) => data,
		),
	createUser: (args, req) =>
		queryDB(req, 'insert into users SET ?', args).then((data) => data),
	deleteUser: (args, req) =>
		queryDB(req, 'delete from users where id = ?', [args.id]).then((data) => data),
};

// The resolvers
const resolvers = {
	Query: { books: () => books },
};

// Put together a schema
exports.graphqlSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

// exports.graphqlSchema = () => {
// 	return makeExecutableSchema({ typeDefs, resolvers });
// };
