import random
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from .celery_tasks import send_email_for_verification_to_user
from .models import Profile


def generate_otp(length=6):
    otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])
    return otp

@receiver(post_save, sender=User)
def save_user_profile_data(sender, created, instance, **kwargs):
    try:
        if created:
            otp = generate_otp()
            Profile.objects.create(user=instance, otp=otp)
            email = instance.email
            send_email_for_verification_to_user.delay(email, otp)
    except Exception as e:
        print(e)