
from datetime import datetime
from fastapi import FastAPI, Response, Depends
from web3 import Web3
from pydantic import BaseModel
import json
import pathlib
from sqlmodel import Session, select
from database import TransactionModel, engine
from models import Asset
from typing import List, Union

app = FastAPI()

def get_session():
    with Session(engine) as session:
        yield session

@app.on_event("startup")
async def startup_event():
    DATAFILE = pathlib.Path() / 'asset.json'
     # create a Session scoped to the startup event
    # Note: we can also use a context manager
    session = Session(engine)

    # check if the database is already populated
    stmt = select(TransactionModel)
    result = session.exec(stmt).first()

    # Load data if there's no results
    if result is None:
        with open(DATAFILE, 'r') as f:
            assets = json.load(f)
            for asset in assets:
                session.add(TransactionModel(**asset))
    
        session.commit()
    session.close()

@app.get('/assets/', response_model=List[Asset])
def assets():
    with Session(engine) as session:
        statement = select(TransactionModel) 
        result = session.exec(statement).all()
    return result

@app.get('/assets/{id}/', response_model=Union[Asset, str])
def asset(id: int, response: Response):
    with Session(engine) as session:
        asset = session.get(TransactionModel, id)

    if asset is None:
        response.status_code = 404
        return "asset not found"
    return asset

@app.post("/assets/", response_model = Asset, status_code = 201)
def create_asset(asset: TransactionModel, session: Session = Depends(get_session)):
    session.add(asset)
    session.commit()
    session.refresh(asset)
    return asset




@app.put("/assets/{id}", response_model=Union[Asset, str])
def update_asset(id: int, updated_asset: Asset, response: Response, session: Session = Depends(get_session)):
    asset = session.get(TransactionModel, id)
    if not asset:
        response.status_code = 404
        return "Asset not found"
    
    asset_data = updated_asset.dict(exclude_unset=True)
    for key, value in asset_data.items():
        setattr(asset, key, value)
    
    session.add(asset)
    session.commit()
    return asset


@app.delete("/assets/{id}")
def delete_asset(id: int, response: Response, session: Session = Depends(get_session)):
    asset = session.get(TransactionModel, id)
    if not asset:
        response.status_code = 404
        return {"message": "Asset not found"}
    
    session.delete(asset)
    session.commit()
    return {"message": "Asset deleted successfully"}


# Connect to the blockchain
w3 = Web3(Web3.HTTPProvider("https://eth-sepolia.g.alchemy.com/v2/_cQb10zXZhy5PRgur8hYXZsvvlIpgKFr"))
if not w3.is_connected():
    print("Failed to connect to Ethereum network!")
else:
    print("Successfully connected to Ethereum network!")


with open('Transactions.json', 'r') as file:
    contract_data = json.load(file)
contract_abi = contract_data['abi']


contract_address = '0x98b9755B02E3C9c215138D283456B3F4895A755A'
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Define a Pydantic model for the transaction data
class TransactionData(BaseModel):
    receiver: str
    amount: int
    message: str
    keyword: str
    tag: str  

@app.post("/send-transaction/")
async def send_transaction(tx_data: TransactionData):
   
    account = w3.eth.account.privateKeyToAccount('1fd92d0f70352422cce7ddd1e6f54435e22bdf4fcaf5eac2c5a6dd77323b8c5c')
    nonce = w3.eth.getTransactionCount(account.address)
    tx = contract.functions.addToBlockchain(
        Web3.toChecksumAddress(tx_data.receiver),
        tx_data.amount,
        tx_data.message,
        tx_data.keyword
    ).buildTransaction({
        'chainId': 11155111,  # Chain ID for Sepolia
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei'),
        'nonce': nonce,
    })
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return {"transaction_hash": w3.toHex(tx_hash)}

@app.get("/transactions/")
async def get_transactions():
    tx_count = contract.functions.getTransactionCount().call()
    transactions = []
    for i in range(tx_count):
        tx = contract.functions.transactions(i).call()
        transactions.append({
            "sender": tx[0],
            "receiver": tx[1],
            "amount": tx[2],
            "message": tx[3],
            "timestamp": tx[4],
            "keyword": tx[5],
        })
    return {"transactions": transactions}


# from typing import Union

# from fastapi import FastAPI

# app = FastAPI()


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}