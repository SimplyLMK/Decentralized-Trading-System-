from typing import List, Union
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
from solcx import compile_standard, install_solc
import json
from models import User, Asset, UserModel, AssetModel
from eth_utils import decode_hex
from web3.auto import w3

install_solc("0.8.0")

# Database setup
DB_FILE = 'db.sqlite3'
Base = declarative_base()
engine = create_engine(DB_FILE, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoints
@app.post("/users/", response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = UserModel(username=user.username, password=user.password, token=user.token)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users

@app.post("/assets/", response_model=Asset)
def create_asset(asset: Asset, db: Session = Depends(get_db)):
    db_asset = AssetModel(name=asset.name, price=asset.price, volume=asset.volume, description=asset.description, category=asset.category, user_id=asset.user_id)
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset

@app.get("/assets/", response_model=List[Asset])
def read_assets(db: Session = Depends(get_db)):
    assets = db.query(AssetModel).all()
    return assets

w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:8000"))

@app.get("/compile/")
def compile_contract():
    with open('./smart_contract_v2/contracts/Transaction.sol', 'r') as file:
        asset_sol = file.read()
    
    compiled_sol = compile_standard({
        "language": "Solidity",
        "sources": {"Transaction.sol": {"content": asset_sol}},
        "settings": {"outputSelection": {"*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}}}
    }, solc_version="0.8.0")
    
    bytecode = compiled_sol["contracts"]["Transaction.sol"]["Asset"]["evm"]["bytecode"]["object"]
    abi = compiled_sol["contracts"]["Transaction.sol"]["Asset"]["abi"]
    
    AssetContract = w3.eth.contract(abi=abi, bytecode=bytecode)
    return {"bytecode": bytecode, "abi": abi}

contract_address = '0x98b9755B02E3C9c215138D283456B3F4895A755A'
contract = w3.eth.contract(address=contract_address, abi=contract_abi)



app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/send_transaction/")
async def send_transaction(receiver: str, amount: int, message: str, keyword: str, db: Session = Depends(get_db)):
    user_id = 1  
    user_credentials = db.query(models.UserCredentials).filter(models.UserCredentials.user_id == user_id).first()
    if not user_credentials:
        raise HTTPException(status_code=404, detail="User credentials not found")

    sender_address = user_credentials.address
    sender_private_key = user_credentials.private_key
    
    
    nonce = w3.eth.getTransactionCount(sender_address)
    txn_dict = contract.functions.addToBlockchain(
        Web3.toChecksumAddress(receiver), amount, message, keyword
    ).buildTransaction({
        'chainId': 1337,  
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei'),
        'nonce': nonce,
    })
    
    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=sender_private_key)
    txn_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    txn_receipt = w3.eth.waitForTransactionReceipt(txn_hash)
    
    if txn_receipt.status == 1:  # Transaction was successful
        return {"status": "success", "transaction_hash": txn_hash.hex()}
    else:
        raise HTTPException(status_code=400, detail="Transaction failed")




@app.route('/signup', methods=['POST'])
def signup():
    public_address = request.json['publicAddress']
    user = User.query.filter_by(publicAddress=public_address).first()
    if not user:
        user = User(publicAddress=public_address)
        db.session.add(user)
        db.session.commit()
    return jsonify(publicAddress=user.publicAddress, nonce=user.nonce)

@app.route('/login', methods=['POST'])
def login():
    public_address = request.json['publicAddress']
    user = User.query.filter_by(publicAddress=public_address).first()
    if not user:
        return jsonify(error='User not found'), 404
    return jsonify(nonce=user.nonce)



