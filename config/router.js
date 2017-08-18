/**
* Routes all API requests to particular functions
* This file would be referenced by the 'app.js' file, as;
* 
*
* 	var app  = express();
*		var routes = require(./router);
*		
*	And called
*
*	routes.setup(app);
*/

require('rootpath')();

var log = require('loglevel');

/**
* These vars are for web API  
*/

var auth                =       require('app/controller/api/v1/auth.controller');
var medicalHistory      =       require('app/controller/api/v1/medicalHistory/medicalHistory.controller');

module.exports.setup = function(app) {
    
    /* routes for medical history */    
    app.post('/api/v1/medicalHistory' , auth.hasAuthorization, medicalHistory.createMedicalHistory);
    app.get('/api/v1/medicalHistory/:recordId' , auth.hasAuthorization, medicalHistory.viewMedicalHistory);
    app.put('/api/v1/medicalHistory/:recordId' , auth.hasAuthorization, medicalHistory.updateMedicalHistory);
    app.delete('/api/v1/medicalHistory/:recordId' , auth.hasAuthorization, medicalHistory.deleteMedicalHistory);
    app.post('/api/v1/medicalHistory/all' , auth.hasAuthorization, medicalHistory.allMedicalHistory);

    /* route to handel 404 error */
    app.use('*', function(req, res) {
		res.status(404).json(
			{ 
				message:'No route found.'
			}
		);
	});
};
