<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'path/to/PHPMailer/src/Exception.php';
    require 'path/to/PHPMailer/src/PHPMailer.php';
    require 'path/to/PHPMailer/src/SMTP.php';
    require '../vendor/autoload.php';
    //Create a new PHPMailer instance
    $mail = new PHPMailer;

    //Enable SMTP debugging. 
    $mail->SMTPDebug = 3;                               
    //Set PHPMailer to use SMTP.
    $mail->isSMTP();            
    //Set SMTP host name                          
    $mail->Host = "smtp.gmail.com";
    //Set this to true if SMTP host requires authentication to send email
    $mail->SMTPAuth = true;                          
    //Provide username and password     
    $mail->Username = "name@gmail.com";                 
    // $mail->Password = "password";                           
    //If SMTP requires TLS encryption then set it
    $mail->SMTPSecure = "tls";                        
    //Set TCP port to connect to 
    $mail->Port = 465;                                   
    
    $mail->From = "volodka.isyk.95@gmail.com";
    $mail->FromName = "Full Name";
    
    $mail->smtpConnect(
        array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
                "allow_self_signed" => true
            )
        )
    );
    
    $mail->addAddress("reciever@ymail.com", "Recepient Name");
    
    $mail->isHTML(true);
    
    $mail->Subject = "Subject Text";
    $mail->Body = "<i>Mail body in HTML</i>";
    $mail->AltBody = "This is the plain text version of the email content";
    
    if (!$mail->send()) {
        $message = 'Error';
        // echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        // echo 'Message sent!';
        $message = 'OK';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>