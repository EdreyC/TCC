import json
import uuid

NUM = 10
PATH = './tasks.json'

def main():
    tasks = []
    for _ in range(NUM):
        user = uuid.uuid4()
        task = {
            'user': user
        }
        tasks.append(task)

    with open(PATH, 'w') as fp:
        json.dump(tasks, fp)