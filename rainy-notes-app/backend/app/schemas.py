from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


# Tag Schemas
class TagBase(BaseModel):
    name: str
    color: Optional[str] = "#6b8e6b"


class TagCreate(TagBase):
    pass


class Tag(TagBase):
    id: int

    class Config:
        from_attributes = True


# Note Schemas
class NoteBase(BaseModel):
    title: str
    content: str


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class Note(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime
    tags: List[Tag] = []

    class Config:
        from_attributes = True


# Response models
class NoteListItem(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    tags: List[Tag] = []

    class Config:
        from_attributes = True
