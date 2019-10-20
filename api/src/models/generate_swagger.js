import mongoose from 'mongoose';
import m2s from 'mongoose-to-swagger';
var fs = require('fs');
// import { writeFile } from 'fs';

import Alias from './alias.js';
import Article from './article.js';
import Content from './content.js';
import Enclosure from './enclosure.js';
import Episode from './episode.js';
import Folder from './folder.js';
import Follow from './follow.js';
import Listen from './listen.js';
import Note from './note.js';
import Pin from './pin.js';
import Playlist from './playlist.js';
import Podcast from './podcast.js';
import Rss from './rss.js';
import Tag from './tag.js';
import User from './user.js';

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

var writerCombined = fs.createWriteStream(`../Docs/swagger/swaggerCombined.json`);
writerCombined.write('[');
console.log('-------\n\n\n------');
const generateSwagger = () => {
	models.forEach((model) => {
		// console.log(model[1], model[0].schema);
		let mongooseModel = mongoose.model(model[1], model[0].schema);
		const swaggerSchema = m2s(mongooseModel);
		const swaggerJson = JSON.stringify(swaggerSchema);
		console.log(swaggerJson);
		var writer = fs.createWriteStream(`../Docs/swagger/${model[1]}.json`);

		writer.write(swaggerJson);
		writerCombined.write(swaggerJson);
		writerCombined.write(',');
	});
};
writerCombined.write(']');
console.log('-------\n\n\n------');
export default generateSwagger;
