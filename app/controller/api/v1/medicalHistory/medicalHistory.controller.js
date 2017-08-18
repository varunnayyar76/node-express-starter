    
    /**
    *
    * This is API end point for Medical History
    * author: Vikas Singla
    *
    */

    require('rootpath')();

	var log                =              require('loglevel');
    
    var Messages           =              require('lang/common');
    var MedicalHistory     =              require('app/model/medicalHistory.model');


     /**
    * API for add patient medical history
    * http method: POST
    * endpoint: http://domain.com/api/v1/medicalHistory
    * params: diagnosis, ICD_10_code, status, onset, occurence,
    * comment, added_by_type, date_informed
    */

    exports.createMedicalHistory = function (req, res) {
        var params = req.body;
        log.warn("---->Comfirmation params are...", params);

        var data = {
            diagnosis: params.diagnosis,
            ICD_10_code: params.ICD_10_code,
            status: params.status,
            onset: params.onset,
            occurence: params.occurence,
            comment: params.comment,
            added_by_type: params.added_by_type,
            date_informed: params.date_informed,
            is_deleted: 0
        };

        var medicalHistory = new MedicalHistory(data);

        medicalHistory.save(function(err){
            if(err) {
                log.error("---->error in saving record...", err);
                res.status(400)
                    .json({
                        type:'error',
                        message:err
                    });
            } else {
                res.status(201)
                    .json({
                        type:'success',
                        message:Messages.createRecord
                    })
            }
        });
    } 

    /**
    * API for add patient medical history
    * http method: GET
    * endpoint: http://domain.com/api/v1/medicalHistory/:recordId
    * params: recordId
    */

    exports.viewMedicalHistory = function (req, res) {
        var recordId = req.params.recordId;
        log.warn("---->Comfirmation params are...", recordId);

        if(recordId) {
            MedicalHistory
            .findOne({_id: recordId}, 
                function(err, record){
                    if(err){
                        log.error("---->error in getting record...", err);
                         res.status(400)
                            .json({
                                type: "error",
                                message: err
                            });
                    } else {
                        if(record) {
                            res.status(200)
                               .json({
                                 type:'success',
                                 data: record
                               });
                           } else {
                            res.status(400)
                               .json({
                                 type:'error',
                                 message: Messages.wrongRecordId
                               });
                           }
                    }
                }
            );
        } else {
            log.error("---->recordId not provided");
            res.status(200)
                .json({
                    type:'error',
                    message:Messages.missingRecordId
                });
        }

    }


     /**
    * API for update patient medical history
    * http method: PUT
    * endpoint: http://domain.com/api/v1/medicalHistory/:recordId
    * params: recordId
    */

    exports.updateMedicalHistory = function (req, res) {
        var recordId = req.params.recordId;
        var params = req.body;

        log.warn("---->Comfirmation params are...", recordId);

        if(recordId) {
            var updateData = {
                diagnosis: params.diagnosis,
                ICD_10_code: params.ICD_10_code,
                status: params.status,
                onset: params.onset,
                occurence: params.occurence,
                comment: params.comment,
                added_by_type: params.added_by_type,
                date_informed: params.date_informed
            };

            MedicalHistory.update(
                {
                    _id: recordId
                },
                updateData,
                function(err,affected) {
                   res.status(200)
                    .json({
                        type:'success',
                        message:Messages.updateRecord
                    });
                });
        } else {
            log.error("---->recordId not provided");
            res.status(200)
                .json({
                    type:'error',
                    message:Messages.missingRecordId
                });
        }
    }

     /**
    * API for update patient medical history
    * http method: DELETE
    * endpoint: http://domain.com/api/v1/medicalHistory/:recordId
    * params: recordId
    */

    exports.deleteMedicalHistory = function (req, res) {
        var recordId = req.params.recordId;
        log.warn("---->Comfirmation params are...", recordId);

        if(recordId) {
            MedicalHistory
            .update({_id: recordId}, {is_deleted:1},
                function(err, record){
                    if(err){
                        log.error("---->error in getting record...", err);
                         res.status(400)
                            .json({
                                type: "error",
                                message: err
                            });
                    } else {
                        res.status(200)
                           .json({
                             type:'success',
                             message: Messages.removeRecord
                           });
                    }
                }
            );
        } else {
            log.error("---->recordId not provided");
            res.status(200)
                .json({
                    type:'error',
                    message:Messages.missingRecordId
                });
        }
    }

    /**
    * API for patient's all medical history
    * http method: POST
    * endpoint: http://domain.com/api/v1/medicalHistory/all
    * params: array of recordIds
    */

    exports.allMedicalHistory = function (req, res) {
        var recordIds = ((req.body || []).recordIds || []);

        if(recordIds.length) {
            MedicalHistory
            .find(
                {_id: { 
                    $in:recordIds
                }}, 
                function(err, records){
                    if(err){
                        log.error("---->error in getting record...", err);
                         res.status(400)
                            .json({
                                type: "error",
                                message: err
                            });
                    } else {
                        res.status(200)
                           .json({
                             type:'success',
                             data: records
                           });
                    }
                }
            );
        } else {
            log.error("---->recordIds not provided");
            res.status(200)
                .json({
                    type:'error',
                    message:Messages.missingRecordId
                });
        }
    }