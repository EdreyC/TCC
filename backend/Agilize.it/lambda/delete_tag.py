import os
import json
import asyncio
from firebase_admin.firestore import client

FIREBASE_PROJECT = os.getenv("FIREBASE_PROJECT")


def handler_name(event, context):
    """
    The handler_name function is used to delete a tag from the database.
    It takes in two parameters, event and context. The event parameter is used to pass in data from an AWS Lambda trigger.
    The context parameter is an object that provides information about the invocation, function and execution environment.
    
    :param event: Pass in event data from the api gateway to the handler function
    :param context: Provide runtime information to the handler function
    :return: The name of the function that was called
    :doc-author: Trelent
    """
    data = json.loads(event["body"])
    tag = data["tag"]
    user = data["user"]

    asyncio.gather(delete_tag(user, tag))

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": "ok"}),
    }


async def delete_tag(user: str, tag: str):
    """
    The delete_tag function removes a tag from the user's task list.
    
    
    
    :param user:str: Specify which user to delete the tag from
    :param tag:str: Specify which tag to delete
    :return: A list of tasks that were updated
    :doc-author: Trelent
    """
    db = client(
        projet=FIREBASE_PROJECT,
    )

    tasks = db.collection("tasks").where("uid", "==", user)

    async for task in tasks:
        if tag in task.tags:
            await task.delete()
