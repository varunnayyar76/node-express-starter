	/**
	*
	* This is Helper for emailing...
	* author: Mike Nielsen
	*
	*/
	require('rootpath')();

	var express   = require('express');
	var config    = require('config/initialize/config');
	var log 	  = require('loglevel');
	var sendgrid  = require('sendgrid')(config.sendgrid_api_key);

	var emailHelper = function () {

		var self = this;

		self.send = function (toEmail, emailText, callback) {

			var email = new sendgrid.Email();

			email.addTo(toEmail);
			email.setFrom("B4CC@LLC.com");
			email.setSubject("Invitation to join B4CC from");
			email.setHtml(emailText);

			sendgrid.send(email, function (err, json) {

				if (err) {
					callback(err);
				}
				
				log.info("---------->Email sent result...", json);

				callback(true);
			});
		};	
	};

	module.exports = emailHelper;