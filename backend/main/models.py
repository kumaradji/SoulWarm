# models.py
import os
from django.db import models
from PIL import Image
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from transliterate import translit


def user_directory_path(instance, filename):
    # Файл будет загружен в MEDIA_ROOT/user_<id>/<filename>
    return f'user_{instance.user.id}/{filename}'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Сохраним ссылку на старый аватар
        try:
            this = Profile.objects.get(id=self.id)
            if this.avatar != self.avatar:
                this.avatar.delete(save=False)
        except Profile.DoesNotExist:
            pass

        super().save(*args, **kwargs)

        # Обработка и сохранение нового аватара
        if self.avatar and hasattr(self.avatar, 'path'):
            try:
                img = Image.open(self.avatar.path)
                if img.height > 300 or img.width > 300:
                    output_size = (300, 300)
                    img.thumbnail(output_size)
                    img.save(self.avatar.path)
            except Exception as e:
                print(f"Ошибка обработки аватара: {e}")

    def delete(self, *args, **kwargs):
        # Удаляем файл аватара при удалении объекта
        if self.avatar:
            if os.path.isfile(self.avatar.path):
                os.remove(self.avatar.path)
        super(Profile, self).delete(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} Profile'

    def get_avatar_url(self):
        if self.avatar and hasattr(self.avatar, 'url'):
            return self.avatar.url
        return None


class Activation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = get_random_string(64)
        super().save(*args, **kwargs)


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user_name = models.CharField(max_length=255, null=True, blank=True)
    content = models.TextField()
    message_id = models.IntegerField(unique=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.user and not self.user_name:
            self.user_name = self.user.username
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user_name}: {self.content}"


class VIPMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user}: {self.content}"


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.name}'


def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    # Транслитерация частей имени файла
    ecostaff_id = translit(str(instance.ecostaff.id), 'ru', reversed=True)
    ecostaff_title = translit(instance.ecostaff.title, 'ru', reversed=True)
    instance_id = translit(str(instance.id), 'ru', reversed=True)

    # Создание имени файла
    filename = f"{ecostaff_id}_{ecostaff_title}_{instance_id}.{ext}"
    return os.path.join('shop/', filename)


class EcoStaff(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}: {self.category}'


class EcoStaffImage(models.Model):
    image = models.ImageField(upload_to=upload_to)
    ecostaff = models.ForeignKey(EcoStaff, related_name='images', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 800 or img.width > 800:
            output_size = (800, 800)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(EcoStaff)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def add_item(self, product):
        self.items.add(product)
        self.total_cost += product.price
        self.save()

    def remove_item(self, product):
        self.items.remove(product)
        self.total_cost -= product.price
        self.save()
