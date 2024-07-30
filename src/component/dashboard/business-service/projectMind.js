import React , {useState , useEffect} from 'react'
import image1 from '../../../../public/businessImages/0000001.png'
import image2 from '../../../../public/businessImages/0000002.png'
import image3 from '../../../../public/businessImages/0000003.png'
import Image from 'next/image'
import ContactButton from '@/component/buttons/ContactButton'
import { contactData2 } from '@/component/assets/business'
import { MdModeEditOutline } from 'react-icons/md'
import { API_URL } from '@/api/commonApi'
import LoadingButton from '@/component/buttons/LoadingButton'


const ProjectMind = ({id}) => {
  const slug = id
  const [edit, setEdit] = useState(false);
  const [dataGet, setDataGet] = useState([]);
  // console.log(dataGet , "dataGet")
  const [editHeading, setEditHeading] = useState('');
  const [editDes, setEditDes] = useState('');
  const [successfullyEdited , setSuccessfullyEdited] = useState(false)
  const [editImage , setEditImage] = useState(null)
  const [editLoading , setEditLoading] = useState(false)


  const fetchProjectMind = async () => {
    try {
      const response = await fetch(
        `${API_URL}auth/v1/business/project-mind/${id}`
      );
    
      if (!response.ok) {
        throw new Error("Failed to fetch Project minds");
      }
      const data = await response.json();

      setDataGet(data.data);
      setEditHeading(data.data?.project?.cardTitle);
      setEditDes(data.data?.project?.cardDescription);
    } catch (error) {
      console.error("Error fetching project-minds:", error);
    }
  } 

  useEffect(() => {
    fetchProjectMind();
    if(id){
      fetchProjectMind();
    }
  }, [id , successfullyEdited]);



  const handleEditData = async (id) => {
    // console.log(id)
    setEditLoading(true)
    const formData = new FormData();
    formData.append('cardTitle', editHeading);
    formData.append('cardDescription', editDes);
    formData.append('slugName', slug);
    formData.append('image', editImage);
  
    // if (inputRef.current && inputRef.current.files[0]) {
    //   formData.append('icon', inputRef.current.files[0]);
    // }
    try {
      const response = await fetch(`${API_URL}auth/v1/business/project-mind/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // console.log('Updated project banner:', data);
      fetchProjectMind();
      setEdit(false);
      setEditLoading(false);
      setSuccessfullyEdited(true);
      
    } catch (error) {
      console.error('Error updating project banner:', error);
      
    }
    
   setEdit(false)
  }

  return (
    <div>
      <section className='py-20 h-[27rem] px-6 bg-gradient-to-r from-black to-gray-800 group'>
      <div className="w-full  text-white grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">
        <div className="flex items-center gap-5 flex-col lg:items-start lg:px-20">
          {edit ? (
            <>
            <input
              type="text"
              value={editHeading}
              onChange={(e) => setEditHeading(e.target.value)}
              className="w-full text-2xl md:text-4xl font-[600] text-black text-center lg:text-start"
            />
            <textarea
              value={editDes}
              onChange={(e) => setEditDes(e.target.value)}
              className="w-full text-lg font-[400] text-black text-center lg:text-start"
            />
            <input
              type="file"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="w-full text-lg font-[400]  text-center lg:text-start"  
            />
            </>
          ) : (
            <>
            <h1 className="text-4xl text-center lg:text-start">
            {dataGet?.project?.cardTitle}
          </h1>
          <p className="text-lg text-gray-300 text-center lg:text-start mb-5">
            {dataGet?.project?.cardDescription}
          </p>
          </>
          )}
          <ContactButton text={contactData2.button} />
        </div>
        {/* <div className="flex  items-center justify-center">
            <img src={contactImage} alt="contactImage" className="h-[10rem] md:h-[15rem]"/>
        </div> */}

        <div className="flex items-center flex-wrap md:flex-nowrap gap-x-4 justify-center ">
          <div className="relative ">
            {" "}
            <img className="  w-1/2 mx-auto" src={dataGet?.project?.image}  />{" "}
            {/* <div className="absolute left-[1.5rem] top-[3rem]">
              <p className="text-center">2500+</p>{" "}
              <p className="text-center w-[99%] font-medium text-gray-200 text-sm">
                satisfied customers
              </p>
            </div>{" "} */}
          </div>
          
         
        </div>
      </div>
      <div className="hidden group-hover:flex justify-end mt-4 me-5">
          {edit ? (
            editLoading ? <LoadingButton/> :
            <button onClick={() => handleEditData(dataGet?.project?._id)} className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold">Save</button>
          ) : (
            <MdModeEditOutline
            onClick={() => setEdit(!edit)}
            className="cursor-pointer text-white"
            size={25}
          />
          )}
        </div>
    </section>
    </div>
  )
}

export default ProjectMind
