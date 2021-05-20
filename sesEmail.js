require('dotenv').config();
var AWS = require('aws-sdk')
const SESConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1",
    
}
console.log(process.env.AWS_ACCESS_KEY,"******",process.env.AWS_SECRET_KEY)
AWS.config.update(SESConfig);
var ses = new AWS.SES()

var data ={
    from : "saurabh@charpixel.com",
    to : "shatakshi.sharma@charpixel.com",
    text  : "simple text",
    subject : "sending email",
}


var sendingEmail = async(data)=>{
   
    if (!data.to || !data.from || !data.subject || !data.text){
        console.log("Must provide required fields.")
    }
    var params = {
        Destination: {
            ToAddresses: [data.to]
        },
        Message: {
            Body: {
                Text: {Data: data.text}
            },
            Subject: {Data: data.subject}
            
        },
        Source: data.from
    }

    try{
       await ses.sendEmail(params).promise()
       console.log("email sent")
    }catch(err){
        console.log(err,"err")
        //return err
    }


}
    
    

sendingEmail(data)
   


























// var sendMail = function(callback){
//     var params ={}

//     params.source ="shatakshi.sharma@charpixel.com";
//     params.destination ="sharmashatakshi777@gmail.com";
    
//     ses.sendTemplatedEmail(params,function(email_err,email_data){
//        if(email_err){
//            console.log(`Failed to send email : ${email_err}`)
//        }else{
//            console.log(`Sucessfully sent the email : ${email_data}`)
//        }
     
//     })
    
// }

// sendMail(function(err,data){
//     if(err){
//         console.log('send mail failed')
//     }else{
//         console.log('send mail succeded')
//     }
// })