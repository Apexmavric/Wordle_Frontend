import { useEffect, useState } from "react";
const ProfilePic = () => {
    const [imageUrl, setImageUrl] = useState('');
    const token = localStorage.getItem('token');
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
                setImageUrl(URL.createObjectURL(blob));
            }
            catch(err)
            {
                console.log(err);
            }
        }
        fetchImage();
      }, [token])
    return (
      <>
        {imageUrl  && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="profile-image profile-pg"
          />
        )}
      </>
    );
  };
  
  export default ProfilePic;
  