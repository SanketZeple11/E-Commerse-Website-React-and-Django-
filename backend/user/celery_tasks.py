from django.core.mail import send_mail, message
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings
from config.celery import app
from random import randint

@app.task(name="send_email_for_verification_to_user")
def send_email_for_verification_to_user(email, otp):
    email_from = settings.EMAIL_HOST_USER
    subject, from_email, to = "Verification Link", email_from, email
    text_content = f"Your OTP is {otp}"
    # html_content = f"<p>Your OTP:{otp}</p>"
    msg = EmailMultiAlternatives(subject, text_content, from_email, [email])
    # msg.attach_alternative(html_content, "text/html")
    msg.send()

    ### for sending link something

    # email_from = settings.EMAIL_HOST_USER
    # subject, from_email, to = "Verification Link", email_from, email
    # text_content = "This is an important message."
    # html_content = f"<p>This is an <a href='http://127.0.0.1:8000/verify?email={email}'>verification mail</a> message.</p>"
    # msg = EmailMultiAlternatives(subject, text_content, from_email, [email])
    # msg.attach_alternative(html_content, "text/html")
    # msg.send()


    # subject = 'Verification Link'
    # email_from = settings.EMAIL_HOST_USER
    # message = "This is your Verification Link {email_token}"
    # msg = EmailMessage(subject, message, email_from, [email])
    # msg.content_subtype = 'html'
    # msg.send()


    # subject = 'Verification Link'
    # msg = "This is your Verification Link {email_token}"
    # body
    # from_email = settings.EMAIL_HOST_USER
    # recipient_list = [email]

    # send_mail(subject, message, from_email, recipient_list)