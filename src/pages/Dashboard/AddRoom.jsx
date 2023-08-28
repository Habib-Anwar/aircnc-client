import { useContext, useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";


const AddRoom = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    // handle form submit
    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        const location = event.target.location.value;
        const title = event.target.title.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = event.target.price.value;
        const total_guest = event.target.total_guest.value;
        const bedrooms = event.target.bedrooms.value;
        const bathrooms = event.target.bathrooms.value;
        const description = event.target.description.value;
        const category = event.target.category.value;

        const image = event.target.image.files[0]

        // Upload image
        imageUpload(image).then(data =>{
            const roomData = {
                image: data.data.display_url,
                location,
                title,
                from,
                to,
                price, 
                total_guest,
                bedrooms,
                bathrooms,
                description,
                category

            }
            console.log(data.data.display_url)
        setLoading(false)})
        .catch(err =>{
            console.log(err.message)
            setLoading(false)
        })
    }
    const handleImageChange = image =>{
        setUploadButtonText(image.name)
    }
    return (
        <div>
          <AddRoomForm
          handleSubmit={handleSubmit}
          loading={loading}
          handleImageChange={handleImageChange}
          uploadButtonText={uploadButtonText}></AddRoomForm>
        </div>
    );
};

export default AddRoom;