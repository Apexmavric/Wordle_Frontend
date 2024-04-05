import React, { useEffect, useState } from 'react';

function Fileupload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageChange, setImagechange] = useState(false);
  const [display, setdisplay] = useState(true);
  const token = localStorage.getItem('token');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // e.target.value = ' ';
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    try {
      const resp = await fetch(process.env.REACT_APP_BACKEND_URL +'/api/v1/player/image', {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${token}`
          },
         body: formData
      });
      const data  = await resp.json();
      console.log(data);
      setImagechange(imageChange => !imageChange);
      setdisplay(prev => ! prev);
    //   console.log(imageChange);
      setImage(image);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  useEffect(()=>{
    const fetchImage = async()=>{
        try{
            const resp = await fetch(process.env.REACT_APP_BACKEND_URL +'/api/v1/player/image',{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            const blob = await resp.blob();
            // console.log(blob);
            setImageUrl(URL.createObjectURL(blob));
        }
        catch(err)
        {
            console.log(err);
        }
    }
    fetchImage();
  }, [imageChange, token])
  const handleImageClick = (e)=>{
    setdisplay(prev => ! prev);
  }
  return (
    <div className='file-upload'>
      {imageUrl && display &&  <img src={imageUrl} alt="Uploaded" onClick={handleImageClick} className='profile-image'/>}
      {
        !display && 
         <>
          <input type="file" accept="image/*" onChange={handleImageChange}/>
          <button onClick={handleUpload}>Upload Image</button>
         </> 
      }
    </div>
  );
}

export default Fileupload;
