#!/usr/bin/python3
'''
    Define class FileStorage
'''
from datetime import datetime
import json
import models
import models.engine.utility as util


class FileStorage:
    '''
        Serializes instances to JSON file and deserializes to JSON file.
    '''
    __file_path = "houses.json"
    __objects = {}

    def all(self, cls=None):
        '''
            Return the dictionary
        '''
        new_dict = {}
        cls = util.convert_class(cls)

        if cls is not None:
            for k, v in self.__objects.items():
                if cls == k.split(".")[0]:
                    new_dict[k] = v
            return new_dict
        else:
            return self.__objects


    def new(self, obj):
        '''
            Set in __objects the obj with key <obj class name>.id
            Aguments:
                obj : An instance object.
        '''
        key = str(obj.__class__.__name__) + "." + str(obj.id)
        value_dict = obj
        FileStorage.__objects[key] = value_dict

    def get(self, cls, id):
        '''
            A method to retrieve one object.
        '''
        c = util.convert_class(cls)
        key = "{}.{}".format(c, id)
        obj = self.__objects.get(key)

        return obj

    def get_by_ip(self, ip):
        '''
            Get visitor by ip
        '''
        all_visitors = self.__objects
        for visitor in all_visitors.values():
            if visitor.ip == ip:
                return visitor
        return None

    def count(self, cls=None):
        '''
            A method to count the number of objects in storage.
        '''
        c = util.convert_class(cls)
        if c is None:
            return len(self.all())
        else:
            return len(self.all(cls))

    def join_tour(self, house_id, date, ip):
        '''
            Join a house tour hour
        '''
        time = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
        house = self.get('House', house_id)
        if house is not None:
            house.days_taken.append((time,ip))
            return time
        else:
            return None

    def leave_tour(self, house_id, date, ip):
        '''
            Remove a house tour hour for particular user
        '''
        time = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
        house = self.get('House', house_id)
        hour = None
        for visitor in house.days_taken:
            vy = visitor[0].year
            vm = visitor[0].month
            vd = visitor[0].day
            vh = visitor[0].hour
            yy = time.year
            ym = time.month
            yd = time.day
            yh = time.hour
            if (vy == yy and vm == ym
                and vd == yd and vh == yh
                and visitor[1] == ip):
                hour = visitor
        if hour is not None:
            house.days_taken.remove(visitor)
            return time
        else:
            return None



    def save(self):
        '''
            Serializes __objects attribute to JSON file.
        '''
        objects_dict = {}
        for key, val in FileStorage.__objects.items():
            objects_dict[key] = val.to_dict()

        with open(FileStorage.__file_path, mode='w', encoding="UTF8") as fd:
            json.dump(objects_dict, fd)

    def reload(self):
        '''
            Deserializes the JSON file to __objects.
        '''
        try:
            with open(FileStorage.__file_path, encoding="UTF8") as fd:
                FileStorage.__objects = json.load(fd)
            for key, val in FileStorage.__objects.items():
                class_name = val["__class__"]
                class_name = models.classes[class_name]
                FileStorage.__objects[key] = class_name(**val)
        except FileNotFoundError:
            pass

    def delete(self, obj=None):
        """
        Delete obj from __objects if inside
        """
        dup_stor = dict(FileStorage.__objects)
        key_to_delete = obj
        for key, value in dup_stor.items():
            if value == key_to_delete:
                del(obj)
                del FileStorage.__objects[key]
                self.save()

    def close(self):
        '''
        Deserialize JSON file to objects
        '''
        self.reload()
