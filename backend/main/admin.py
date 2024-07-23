from django.contrib import admin
from django.db import models
from .models import Profile, Activation, Category, EcoStaff, Cart, EcoStaffImage, Message


class EcoStaffImageInline(admin.TabularInline):
    model = EcoStaffImage
    extra = 1


@admin.register(EcoStaff)
class EcoStaffAdmin(admin.ModelAdmin):
    inlines = [EcoStaffImageInline]
    list_display = ('title', 'category', 'price', 'description')
    search_fields = ('title', 'category__name', 'description')
    list_filter = ('category',)
    exclude = ('images',)
    formfield_overrides = {
        models.JSONField: {'widget': admin.widgets.AdminTextareaWidget},
    }


@admin.register(EcoStaffImage)
class EcoStaffImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'ecostaff']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'timestamp', 'is_admin')
    search_fields = ('user__username', 'content')
    list_filter = ('is_admin', 'timestamp')


admin.site.register(Profile)
admin.site.register(Activation)
admin.site.register(Category)
admin.site.register(Cart)
