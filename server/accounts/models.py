from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.conf import settings
import os


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'image/user_{0}/profile/{1}'.format(instance.id, filename)


# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    profile_image = ProcessedImageField(
        upload_to=user_directory_path,
        processors=[ResizeToFill(300, 300)],
        format='JPEG',
        options={'quality': 100},
        default='image/default/default_profile.jpg',
        blank=True)

