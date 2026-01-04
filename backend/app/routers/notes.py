from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas
from ..database import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Note, status_code=201)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db=db, note=note)


@router.get("/", response_model=List[schemas.Note])
def read_notes(
    skip: int = 0,
    limit: int = 100,
    tag_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    notes = crud.get_notes(db, skip=skip, limit=limit, tag_id=tag_id)
    return notes


@router.get("/search", response_model=List[schemas.Note])
def search_notes(q: str, db: Session = Depends(get_db)):
    if not q:
        return []
    return crud.search_notes(db, query=q)


@router.get("/{note_id}", response_model=schemas.Note)
def read_note(note_id: int, db: Session = Depends(get_db)):
    db_note = crud.get_note(db, note_id=note_id)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note


@router.put("/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteUpdate, db: Session = Depends(get_db)):
    db_note = crud.update_note(db, note_id=note_id, note=note)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note


@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    success = crud.delete_note(db, note_id=note_id)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found")
    return None


@router.post("/{note_id}/tags/{tag_id}", response_model=schemas.Note)
def add_tag_to_note(note_id: int, tag_id: int, db: Session = Depends(get_db)):
    db_note = crud.add_tag_to_note(db, note_id=note_id, tag_id=tag_id)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note or Tag not found")
    return db_note


@router.delete("/{note_id}/tags/{tag_id}", response_model=schemas.Note)
def remove_tag_from_note(note_id: int, tag_id: int, db: Session = Depends(get_db)):
    db_note = crud.remove_tag_from_note(db, note_id=note_id, tag_id=tag_id)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note or Tag not found")
    return db_note
