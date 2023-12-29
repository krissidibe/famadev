import nodemailer from 'nodemailer';   
const transporter = nodemailer.createTransport({
    host: 'mail67.lwspanel.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@concours-fama.com',
      pass: 'Famaconc@2023',
    },
  });    
 

  export default transporter;