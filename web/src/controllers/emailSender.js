function enviarEmail(req, res) {
    var nodemailer = require('nodemailer');

    senha = ''

    var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'GCT_bot_no_reply@outlook.com.br', 
        pass: String(senha) 
    }
    });

    var mailOptions = {
        from: 'GCT_bot_no_reply@outlook.com.br',
        to: 'GrayCloudTransactions@hotmail.com',
        subject: req.body.assuntoServer,
        text: `Email de:\n 
        Nome: ${req.body.nomeServer}\n
        Email: ${req.body.emailServer}\n
        -------------------------------\n
        ${req.body.mensagemServer}
        `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json(erro.sqlMessage);
        } else {
            console.log('Email sent: ' + info.response);
            res.json("email enviado!!");
        }
    });
}

module.exports = {
    enviarEmail
}