from pydantic import BaseModel
from typing import Union
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

Base = declarative_base()

# Pydantic models
class User(BaseModel):
    id: Union[int, None] = None
    username: str
    password: Union[str, None] = None
    token: Union[str, None] = None

class Asset(BaseModel):
    id: Union[int, None] = None
    name: str
    price: Union[float, None] = None
    volume: Union[float, None] = None
    description: str
    category: str
    user_id: int


class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    token = Column(String)

class AssetModel(Base):
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    volume = Column(Float)
    description = Column(String)
    category = Column(String)
    user_id = Column(Integer)
