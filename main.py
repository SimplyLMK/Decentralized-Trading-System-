# from typing import Union

# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI()


# class Item(BaseModel):
#     name: str
#     price: float
#     is_offer: Union[bool, None] = None


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# @app.put("/items/{item_id}")
# def update_item(item_id: int, item: Item):
#     return {"item_name": item.name, "item_id": item_id}


from fastapi import FastAPI
from web3 import Web3
from pydantic import BaseModel
import json

app = FastAPI()

# Connect to the blockchain
w3 = Web3(Web3.HTTPProvider("https://eth-sepolia.g.alchemy.com/v2/_cQb10zXZhy5PRgur8hYXZsvvlIpgKFr"))
if not w3.is_connected():
    print("Failed to connect to Ethereum network!")
else:
    print("Successfully connected to Ethereum network!")

# Replace YOUR_CONTRACT_ABI and YOUR_CONTRACT_ADDRESS with your actual contract ABI and address
with open('Transactions.json', 'r') as file:
    contract_data = json.load(file)
contract_abi = contract_data['abi']

# Use the contract address from your constants.js
contract_address = '0x98b9755B02E3C9c215138D283456B3F4895A755A'
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Define a Pydantic model for the transaction data
class TransactionData(BaseModel):
    receiver: str
    amount: int
    message: str
    keyword: str

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
