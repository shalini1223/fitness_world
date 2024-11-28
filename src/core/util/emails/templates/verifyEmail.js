export const sendOtpTemplate = (req,otp) =>{
    return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .header {
      text-align: center;
      color: #333333;
    }
    .content {
      font-size: 16px;
      color: #555555;
      margin: 20px 0;
      line-height: 1.5;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #007BFF;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      display: inline-block;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #aaaaaa;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1 class="header">Set Your Password</h1>
    <p class="content">
      Hello ,Here is your onetime passcode: <strong>${otp}</strong>, <br><br>
      We received a request to set your password. Click the button below to set your password securely.
    </p>
    <div class="button-container">
      <a href="{{passwordLink}}" class="button">Click Here</a>
    </div>
    <p class="content">
      If you did not request this, please ignore this email or contact support.
    </p>
    <div class="footer">
      &copy; 2024 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};