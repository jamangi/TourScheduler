#!/usr/bin/python3
'''
    Class representing a house for touring
'''
from datetime import datetime
from datetime import timedelta
import json
from models.base_model import BaseModel
import models
import os

class House(BaseModel):
    '''
        Definition of the House class
    '''
    visits = 1
    photo = ''
    duration = (datetime.now(), datetime.now() + timedelta(days=30))
    days_taken = [(duration[0],"0.0.0.0")]
    owner = ''
    contact = ''
    address = ''
    price = 0
    lat = 0
    lon = 0
    description = ''


    def update(self, **kwargs):
        duration = kwargs["duration"]
        days = [] if kwargs.get("days_taken") is None else kwargs.get("days_taken")
        duration_start = datetime.strptime(duration[0], "%Y-%m-%dT%H:%M:%S")
        duration_end = datetime.strptime(duration[1], "%Y-%m-%dT%H:%M:%S")
        days_taken = [(datetime.strptime(x,"%Y-%m-%dT%H:%M:%S"),y) for x,y in days]
        kwargs["duration"] = (duration_start, duration_end)
        kwargs["days_taken"] = days_taken
        for key, val in kwargs.items():
            if "__class__" not in key:
                setattr(self, key, val)

    def to_dict(self):
        '''
            Return dictionary representation of BaseModel class.
        '''
        cp_dct = dict(self.__dict__)
        try:
            del cp_dct['_sa_instance_state']
        except KeyError:
            pass
        cp_dct['__class__'] = self.__class__.__name__
        cp_dct['updated_at'] = self.updated_at.strftime("%Y-%m-%dT%H:%M:%S.%f")
        cp_dct['created_at'] = self.created_at.strftime("%Y-%m-%dT%H:%M:%S.%f")
        duration_start = self.duration[0].strftime("%Y-%m-%dT%H:%M:%S")
        duration_end = self.duration[1].strftime("%Y-%m-%dT%H:%M:%S")
        cp_dct['duration'] = (duration_start, duration_end)
        days = self.days_taken
        days_taken = [(x.strftime("%Y-%m-%dT%H:%M:%S"),y) for x,y in days]
        cp_dct['days_taken'] = days_taken
        return (cp_dct)