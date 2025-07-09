from django.db import models

class Product(models.Model):
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=20)

    class Meta:
        db_table = 'Products'
        managed = False