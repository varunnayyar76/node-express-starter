
 /**
  *
  * Medical History Model
  * It stores patient medical
  * history data
  * 
  */

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;


  var MedicalHistorySchema = new Schema({
    diagnosis      : 	{ type: String },
    ICD_10_code  	 : 	{ type: String },
    status    		 : 	{ type: String, enum: ['current','resolved']},
    onset    		   : 	{ type: String },
    occurence    	 : 	{ type: String, enum: ['acute','chronic']},
    comment    		 : 	{ type: String },
    added_by_type	 :  { type: String, enum: ['provider','patient'] },
    date_informed  : 	{ type: Date, default: Date.now },
    is_deleted     :  { type: Number, enum: [0,1], default: 0}
  });

  module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);