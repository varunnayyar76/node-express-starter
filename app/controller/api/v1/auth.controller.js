	/**
	*
	* This is API end point for User anthentication via mobile
	*
	*
	*/

	// 'use strict';

	require('rootpath')();

	var jwt       = require('jsonwebtoken');
	var ip        = require('ip');
	var log       = require('loglevel');
	var config    = require('config/initialize/config');
	var mongoose  = require('mongoose');
  
	/**
	*
	* Load Tmap Model for token-ipaddress authentication
	*
	*/

	var Tmap = require('app/model/tmap.model');


	/**
	* API end point for validation token and ipaddress
	* http method: POST
	* http://hostname/api/v1/auth/validate
	* params: auth_token, ipaddress
	* success or fail
	*/

	exports.hasAuthorization = function(req, res, next) {
		console.log('auth check');
		// defination is pending
		next();
	}
