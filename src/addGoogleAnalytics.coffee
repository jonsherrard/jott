addGoogleAnalytics = () ->
	fs.readJson projectDir + '/jott.json', (err, jsonObject) =>
		if err
			log err
			throw err
		jottOptions = jsonObject
		prompt 'Enter your Google Analytics tracking code.\nFormat: UA-12345678-0\n-> ', (code, end, err) =>
			if err
				log err
				throw err
			jottOptions.googleAnalytics = code
			end()
			fs.writeJson projectDir + '/jott.json', jottOptions, (err) =>
				if err
					log err
					throw err
				log 'Google Analytics Added'


