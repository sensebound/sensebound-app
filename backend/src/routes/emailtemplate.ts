



interface resendEmailInputs {
    token : string,
    userId: string,
    frontendUrl : string
}



export default function emailTemplate({token, userId, frontendUrl} : resendEmailInputs){

    const url  = frontendUrl + '/reset?userid=' + userId + "&token=" + token
    const resetEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 4px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <p>
          <a href=${url} style="display: inline-block; margin: 10px 0; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>Thanks,<br>The Sensebound Team</p>
      </div>
    </body>
    </html>
    `

    return resetEmail
};