from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Asset(BaseModel):
    id: Optional[int] = None
    title: str
    sender: str
    amount: float
    tag: str  