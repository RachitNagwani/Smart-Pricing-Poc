from django.db import models

class ProductIND(models.Model):
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=20)

    class Meta:
        db_table = 'products_ind'
        managed = False  # Assuming tables already exist

class ProductUK(models.Model):
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=20)

    class Meta:
        db_table = 'products_uk'
        managed = False

class ProductUS(models.Model):
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=20)

    class Meta:
        db_table = 'products_usa'
        managed = False
