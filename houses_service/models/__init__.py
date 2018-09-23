#!/usr/bin/python3
'''
    Package initializer
'''

from models.base_model import BaseModel
from models.house import House
from models.engine.file_storage import FileStorage

classes = {"House": House, "BaseModel": BaseModel}

storage = FileStorage()
storage.reload()