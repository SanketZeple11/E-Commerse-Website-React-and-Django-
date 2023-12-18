from django.db import models
from base.models import BaseModel

class Category(BaseModel):
    category_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, null=True, blank=True)

class Product(BaseModel):
    product_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, null=True, blank=True)
    product_description = models.TextField()
    product_price = models.IntegerField()
    product_image = models.ImageField(upload_to='product')
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
