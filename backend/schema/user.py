from pydantic import BaseModel

class User(BaseModel) :
    id : int
    name: str
    senha: str
    email: str
    is_admin: bool