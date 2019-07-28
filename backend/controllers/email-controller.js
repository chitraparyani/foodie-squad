const emailService = require('../services/email-service');

exports.sendMail=function(req,res){
    let data={
        email:req.body.email,
        name: req.body.name,
        message: req.body.message
    }
    console.log(data);
    // user search service
    emailService.sendMail(data)
    .then((response)=>{
        console.log("Sending Mail");
        res.status(200);
        res.json(response);
    })
    .catch(err=>{
        res.status(500);
        res.json(err);
    })

}
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};