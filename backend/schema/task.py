from enum import Enum
from pydantic import BaseModel

class Tarefa(BaseModel):
    titulo: str
    descricao: str
    comentarios: list(str)
    prioridade: Enum
    status: bool