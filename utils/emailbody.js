function bodyOtpChangePassword(otp) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset ="UTF-8">
    <meta name ="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 20px;
    }

    .card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10 px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 0 auto;
        max-width: 600px;
    }

    .otp {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
        }



    .message {
        font-size: 16px;
        color: #555;
        margin-bottom: 20px;
    }

    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        }
    </style>

</head>
<body>
    <div class="card">
        <p class="otp">Your OTP (One Time Password) for password change is: <strong>${otp}</strong>.</p>
        <p class="message">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        <p class="message">If you did not request this OTP, please contact the admin.</p>
        <!-- Add a button to contact admin via email -->
        <a class="button"
            href="mailto:digzens@gmail.com?subject=Password Change Request&body=Hello%20Admin,%0D%0A%0D%0AI%20need%20assistance%20with%20my%20password%20change.%0D%0A%0D%0AThank%20you.">Contact
        Admin</a>
    </div>
</body>
</html>
  `;
}

module.exports = {
    bodyOtpChangePassword
}