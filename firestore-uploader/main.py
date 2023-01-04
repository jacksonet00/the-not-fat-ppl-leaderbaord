import pandas as pd
import numpy as np
from uuid import uuid4
from firebase_admin import credentials, initialize_app, firestore


def main():
    # Initialize
    cred = credentials.Certificate("./serviceAccountKey.json")
    initialize_app(cred)

    # Read
    df = pd.read_csv('./data.csv')

    # Clean
    df = df.drop(df.columns[[0, 8]], axis=1)

    # Process
    participants = []
    for i, name in enumerate(df.columns):
        daysCompleted = df.index[df[name] == True].tolist()
        participants.append({
            'id': uuid4().hex,
            'name': name,
            'daysCompleted': daysCompleted,
            'challengeId': '2uzcyL8J40lIgzkyqp8G'
        })
    participants = np.array(participants)

    # Write
    db = firestore.client()

    participants_collection = db.collection('participants')

    batch = db.batch()
    for participant in participants:
        batch.set(
            participants_collection.document(participant['id']),
            {
                'name': participant['name'],
                'daysCompleted': participant['daysCompleted'],
                'challengeId': participant['challengeId']
            }
        )
    batch.commit()


if __name__ == "__main__":
    main()
