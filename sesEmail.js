require('dotenv').config();
var AWS = require('aws-sdk')
const SESConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1",
    
}

AWS.config.update(SESConfig);
var ses = new AWS.SES()


exports.handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
        for (const { messageId, body } of event.Records) {
                const to = body.to ,
                const from = body.from, 
                const subject = body.subject,
                const text  = body.text

                if (!to || !from || !subject || !text){
                    console.log("Must provide required fields.")
                }
                
                var params = {
                    Destination: {
                        ToAddresses: [to]
                    },
                    Message: {
                        Body: {
                            Text: {Data: text}
                        },
                        Subject: {Data: subject}
                        
                    },
                    Source: from
                }

                try{
                await ses.sendEmail(params).promise()
                console.log("email sent")
                }catch(err){
                    console.log(err,"err")
                    
                }

        }
      
    return `Successfully processed ${event.Records.length} messages.`;    

}    
    
// send(d)






















