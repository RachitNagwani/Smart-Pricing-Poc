class MarketRouter:
    """
    A router to control all database operations on models for different markets.
    """

    def db_for_read(self, model, **hints):
        if model._meta.db_table == 'products_ind':
            return 'india_db'
        elif model._meta.db_table == 'products_uk':
            return 'uk_db'
        elif model._meta.db_table == 'products_usa':
            return 'usa_db'
        return 'default'

    def db_for_write(self, model, **hints):
        # Use same logic for writes
        return self.db_for_read(model, **hints)

    def allow_relation(self, obj1, obj2, **hints):
        # Allow relations only if both objects are in the same database
        db_obj1 = obj1._state.db
        db_obj2 = obj2._state.db
        if db_obj1 and db_obj2 and db_obj1 == db_obj2:
            return True
        return False

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        # Allow migrations only on the matching database for each model
        if model_name:
            model_name = model_name.lower()
        if db == 'india_db':
            return model_name == 'productind'
        elif db == 'uk_db':
            return model_name == 'productuk'
        elif db == 'usa_db':
            return model_name == 'productus'
        return db == 'default'
