// Display.js
import { Link } from 'react-router-dom';


export default function Display({ assets, count  })
 {
    console.log(count);
    const chunks = [];
    for (let i = 0; i < count; i += 5) {
    chunks.push(assets.slice(i, i + 5));
  }

  return (
    <div>
      {chunks.map((chunk, index) => (
        <div key={index} className="flex-container">
          {chunk.map(asset => (
            <Link className="main" key={asset.id} to={`/details/${asset.id}`}>
              <div className="asset-container">
              <div id="parent">
                <div className="asset-image-container">
                  <div className="asset-image-overlayer2"></div>
                  <img src={asset.image}/> 
                </div>
  
                <div className="asset-info">
                  <div className="asset-image-container2">
                    <img src={asset.image}/> 
                    <h2>{asset.name}</h2>
                    
                  </div>
                </div>
  
  
                <div className="asset-image-container3">
                  <div className="asset-image-overlayer1"></div>
                  <img src={asset.image} /> 
                </div>
              </div>
  
            </div>
  
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className="flex-container">
      
  //     {/* map out all of the documents in a collection */}
  //     {assets && assets.map(asset => (
  //       <Link className="main" key={asset.id} to={`/details/${asset.id}`}>

  //         <div className="asset-container">
  //           <div id="parent">
  //             <div className="asset-image-container">
  //               <div className="asset-image-overlayer2"></div>
  //               <img src={asset.image}/> 
  //             </div>

  //             <div className="asset-info">
  //               <div className="asset-image-container2">
  //                 <img src={asset.image}/> 
  //                 <h2>{asset.name}</h2>
                  
  //               </div>
  //             </div>


  //             <div className="asset-image-container3">
  //               <div className="asset-image-overlayer1"></div>
  //               <img src={asset.image} /> 
  //             </div>
  //           </div>

  //         </div>
  //       </Link>
  //     ))}
  //   </div>
  // );
}



