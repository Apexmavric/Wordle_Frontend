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
      setImage(image);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const handleClick = (e)=>{
    setdisplay(prev => ! prev);
  }
  return (
    <div className='file-upload'>
      {display &&  <div onClick={handleClick}>
        <div>
          Change Profile-Picture
        </div>
        </div>}
      {
        !display && 
         <div className='upload-btns'>
          <input type="file" accept="image/*" onChange={handleImageChange}/>
          <button onClick={handleUpload}>Upload Image</button>
         </div> 
      }
    </div>
  );
}

export default Fileupload;
