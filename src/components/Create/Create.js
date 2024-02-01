import { useState, useEffect } from 'react';
import Select from 'react-select';
import './create.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionsContext } from '../../context/TransContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import { stor } from '../../fb/config';





const tags = [
    { value: 'wjbu', label: 'Wjbu' },
    { value: 'yoi', label: 'Yoi' },
    { value: 'cheapest', label: 'Cheapest' },
    { value: 'expensive', label: 'Expensive' },
];

export default function Create() 
{
    //const { mintNFT, account } = useContext(TransactionsContext);

    // reveice the props "account" passed from Transcontext.js to push address to firestore
    const { account } = useContext(TransactionsContext);
    const navigate = useNavigate()

    // form field values
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');


    const { documents } = useCollection('users')
    //const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);
    const { addDocument, response } = useFirestore('assets')
    
    // useEffect(() => {
    //     if(documents) {
    //       setUsers(documents.map(user => {
    //         return { value: {...user, id: user.id}, label: user.displayName }
    //       }))
    //     }
    //   }, [documents])
    


    const handleImageChange = (e) => 
    {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
    
        if (!category) 
        {
            setFormError('Please select a asset category.');
            return;
        }

         // Create a storage ref
        const storageRef = stor.ref();
        const fileRef = storageRef.child(image.name);

        // Upload the file
        const snapshot = await fileRef.put(image);
    
        // Get the URL of the uploaded file
        const url = await snapshot.ref.getDownloadURL();
        

        // the key point here is that the url is retrieved before pushing data to firestore
        const asset = 
        {
            name,
            price,
            account,
            category: category.value,
            image: url,
            
        };

        await addDocument(asset)
        if (!response.error)
        {
        navigate('/');
        }
    
        
    };

    
    return (
        <div className="create-form">
            <h2 className="page-title">Create a new asset</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name:</span>
                    <input
                        required 
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        
                    />
                </label>
                <label>
                    <span>Ethereum price:</span>
                    <input
                        required 
                        type="number" 
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </label>

                <label> <p>{account}</p> </label>

                <label>
                    <span>Upload Image/Gif:</span>
                    <input type="file" onChange={handleImageChange}  />
                </label>

                <label>
                    <span>Tags:</span>
                     <Select
                        onChange={(option) => setCategory(option)}
                        options={tags}
                        handleChange={() => {}}
                    /> 
                </label>
                

                <button className="btn">Add asset</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
