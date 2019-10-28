#!/usr/bin/env babel-node
import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);
console.log('mongoose', mongoose);
var fs = require('fs');

const Alias = require('../models/alias.js');
const Article = require('../models/article.js');
const Content = require('../models/content.js');
// const import = require('../models/enclosure.js');
const Episode = require('../models/episode.js');
const Folder = require('../models/folder.js');
const Follow = require('../models/follow.js');
const Listen = require('../models/listen.js');
const Note = require('../models/note.js');
const Pin = require('../models/pin.js');
const Playlist = require('../models/playlist.js');
const Podcast = require('../models/podcast.js');
const Rss = require('../models/rss.js');
const Tag = require('../models/tag.js');
const User = require('../models/user.js');

var models = [
	[Alias, 'Alias'],
	[Article, 'Article'],
	[Content, 'Content'],
	// [Enclosure, 'Enclosure'],
	[Episode, 'Episode'],
	[Folder, 'Folder'],
	[Follow, 'Follow'],
	[Listen, 'Listen'],
	[Note, 'Note'],
	[Pin, 'Pin'],
	[Playlist, 'Playlist'],
	[Podcast, 'Podcast'],
	[Rss, 'Rss'],
	[Tag, 'Tag'],
	[User, 'User'],
];

console.log('-------\n\n\n------');
let combinedSchema = {};
var writerCombined = fs.createWriteStream(`./Docs/json-schema/schemaCombined.json`);
models.forEach((model) => {
	console.log(model[1]);
	let jsonSchema = model[0].schema.jsonSchema();
	var writer = fs.createWriteStream(`./Docs/json-schema/${model[1]}.json`);
	writer.write(JSON.stringify(jsonSchema));
	combinedSchema[model[1]] = jsonSchema;
});
writerCombined.write(JSON.stringify(combinedSchema));
console.log('-------\n\n\n------');
