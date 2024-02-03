
import { Link } from 'react-router-dom';


//__writen by 104179506__Le Minh Kha
// encapsulate the display of assets into a component
// => reduce code spagetification on Dashboard
export default function Display({ assets, count  })
 {
    console.log(count);

    // stored assets in an array, if count exceed 5, slice it.
    // this is to not overpopulate a single row, a row max is 5
    const chunks = [];
    for (let i = 0; i < count; i += 5) {
    chunks.push(assets.slice(i, i + 5));
  }

  // 'assets' is the name of the collection that stored all of the document
  // 'asset' is singlular document in the collection
  // the rendering is reused from another project of mine
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

}



