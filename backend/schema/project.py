from pydantic import BaseModel
from backend.schema.task import Tarefa
from backend.schema.user import User

class Project(BaseModel):
    backlog: list(Tarefa)
    membros: list(User)
    titulo: str
    descricao: str