from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas
from typing import List, Optional


# Note CRUD operations
def create_note(db: Session, note: schemas.NoteCreate) -> models.Note:
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


def get_note(db: Session, note_id: int) -> Optional[models.Note]:
    return db.query(models.Note).filter(models.Note.id == note_id).first()


def get_notes(db: Session, skip: int = 0, limit: int = 100, tag_id: Optional[int] = None) -> List[models.Note]:
    query = db.query(models.Note)

    if tag_id:
        query = query.join(models.Note.tags).filter(models.Tag.id == tag_id)

    return query.order_by(models.Note.updated_at.desc()).offset(skip).limit(limit).all()


def update_note(db: Session, note_id: int, note: schemas.NoteUpdate) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    if not db_note:
        return None

    if note.title is not None:
        db_note.title = note.title
    if note.content is not None:
        db_note.content = note.content

    db.commit()
    db.refresh(db_note)
    return db_note


def delete_note(db: Session, note_id: int) -> bool:
    db_note = get_note(db, note_id)
    if not db_note:
        return False

    db.delete(db_note)
    db.commit()
    return True


def search_notes(db: Session, query: str) -> List[models.Note]:
    search_pattern = f"%{query}%"
    return db.query(models.Note).filter(
        or_(
            models.Note.title.like(search_pattern),
            models.Note.content.like(search_pattern)
        )
    ).order_by(models.Note.updated_at.desc()).all()


# Tag CRUD operations
def create_tag(db: Session, tag: schemas.TagCreate) -> models.Tag:
    db_tag = models.Tag(name=tag.name, color=tag.color)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


def get_tag(db: Session, tag_id: int) -> Optional[models.Tag]:
    return db.query(models.Tag).filter(models.Tag.id == tag_id).first()


def get_tag_by_name(db: Session, name: str) -> Optional[models.Tag]:
    return db.query(models.Tag).filter(models.Tag.name == name).first()


def get_tags(db: Session) -> List[models.Tag]:
    return db.query(models.Tag).order_by(models.Tag.name).all()


# Note-Tag relationship operations
def add_tag_to_note(db: Session, note_id: int, tag_id: int) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    db_tag = get_tag(db, tag_id)

    if not db_note or not db_tag:
        return None

    if db_tag not in db_note.tags:
        db_note.tags.append(db_tag)
        db.commit()
        db.refresh(db_note)

    return db_note


def remove_tag_from_note(db: Session, note_id: int, tag_id: int) -> Optional[models.Note]:
    db_note = get_note(db, note_id)
    db_tag = get_tag(db, tag_id)

    if not db_note or not db_tag:
        return None

    if db_tag in db_note.tags:
        db_note.tags.remove(db_tag)
        db.commit()
        db.refresh(db_note)

    return db_note
