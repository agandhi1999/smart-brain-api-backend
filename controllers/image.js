const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '4f28e3fe842b46b0b67ccb1207a27e39'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to work with API.'));
}

const handleImage = (req, res, db)=>{
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}