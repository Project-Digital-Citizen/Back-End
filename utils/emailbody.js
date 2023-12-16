function bodyOtpChangePassword(otp) {
    return `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .card {
            background-color: #83a2ff;
            border-radius: 8px;
            box-shadow: 0 0 10 px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
        }

        .otptext {
            text-align: center;
            font-size: 23px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
        }

        .otpnumber {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #f1cc5b;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
        }



        .message {
            font-size: 16px;
            color: #555;
            text-align: center;
        }

        .button {
            display: block;
            padding: 10px 10px;
            background-color: #fff;
            color: #83a2ff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            border: 2px solid transparent;
            /* Add an initial transparent border */
        }

        .button:hover {
            border-color: #fff;
            background-color: #83a2ff;
            color: #fff;
        }

        .red {
            color: #af2f2f;
            font-weight: bold;
        }
    </style>

</head>

<body>
    <div class="card">
        <h1 class="otptext">Your OTP for password change is: <span class="otpnumber">${otp}</span>
        </h1>
        <p class="message">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
        <p class="message red">If you did not request this OTP, please contact the admin.</p>
        <!-- Add a button to contact admin via email -->
        <a class="button"
            href="mailto:digzens@gmail.com?subject=Password Change Request&body=Hello%20Admin,%0D%0A%0D%0AI%20need%20assistance%20with%20my%20password%20change.%0D%0A%0D%0AThank%20you.">Contact
            Admin</a>
    </div>
</body>
  `;
}
function bodyOtp(otp) {
    return `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .card {
            background-color: #83a2ff;
            border-radius: 8px;
            box-shadow: 0 0 10 px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
        }

        .otptext {
            text-align: center;
            font-size: 23px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
        }

        .otpnumber {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #f1cc5b;
            margin-top: 10px;
            margin-bottom: 10px;
            display: block;
        }

        .message {
            font-size: 16px;
            color: #555;
            text-align: center;
            margin-bottom: 10px;
        }

    </style>

</head>

<body>
    <div class="card">
        <h1 class="otptext">Your OTP for password change is: <span class="otpnumber">${otp}</span>
        </h1>
        <p class="message">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
    </div>
</body>
  `;
}

module.exports = {
    bodyOtpChangePassword,
    bodyOtp
}