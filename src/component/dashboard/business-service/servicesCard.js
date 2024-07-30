import { API_URL } from '@/api/commonApi';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoTrashBin } from 'react-icons/io5';
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ServicesCard = ({ id }) => {
    const [services, setServices] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [isMainEditing, setIsMainEditing] = useState(false);
    const [mainHeading, setMainHeading] = useState('');
    const [description, setDescription] = useState('');
    const [successfullyEdited, setSuccessfullyEdited] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardDescription, setNewCardDescription] = useState('');
    const [newCardIcon, setNewCardIcon] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}auth/v1/business/service-card/${id}`);
            const result = await response.json();
            if (result.status) {
                setServices(result.data);
                setMainHeading(result.data.mainHeading);
                setDescription(result.data.description);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, successfullyEdited]);

    const handleEditClick = (id) => {
        setEditingId(id === editingId ? null : id);
    };

    const handleMainEditClick = () => {
        setIsMainEditing(true);
    };

    const handleInputChange = (e, id, field) => {
        const updatedServices = services.cardServiceData.map((service) => {
            if (service._id === id) {
                return { ...service, [field]: e.target.value };
            }
            return service;
        });
        setServices((prev) => ({ ...prev, cardServiceData: updatedServices }));
    };

    const inputRef = useRef(null);
    const handleCancelEdit =()=>{
        setSuccessfullyEdited((prev) => !prev);
        setEditingId(null);
    }
    const handleEditData = async (idd) => {
        const updatedSingleService = services.cardServiceData.find((service) => service._id === idd);

        const formData = new FormData();
        formData.append('cardTitle', updatedSingleService.cardTitle);
        formData.append('cardDescription', updatedSingleService.cardDescription);
        formData.append('slugName', id);

        if (inputRef.current && inputRef.current.files[0]) {
            formData.append('icon', inputRef.current.files[0]);
        }

        try {
            const res = await fetch(`${API_URL}auth/v1/business/service-card/${idd}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to update service');
            }

            setSuccessfullyEdited((prev) => !prev);
        } catch (error) {
            console.error('Error updating data:', error);
        }
        setEditingId(null);
    };

    const handleMainSave = async () => {
        try {
            const res = await fetch(`${API_URL}auth/v1/business/service-card/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mainHeading,
                    description,
                    slugName: id,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update main heading and description');
            }

            setSuccessfullyEdited((prev) => !prev);
        } catch (error) {
            console.error('Error updating data:', error);
        }
        setIsMainEditing(false);
    };

    const handleMainCancel = () => {
        setMainHeading(services.mainHeading);
        setDescription(services.description);
        setIsMainEditing(false);
    };

    const handleAddCardClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewCardTitle('');
        setNewCardDescription('');
        setNewCardIcon(null);
    };

    const handleNewCardSave = async () => {
        const formData = new FormData();
        formData.append('cardTitle', newCardTitle);
        formData.append('cardDescription', newCardDescription);
        formData.append('icon', newCardIcon);
        formData.append('slugName', id);

        try {
            const res = await fetch(`${API_URL}auth/v1/business/service-card/`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to add service');
            }

            setSuccessfullyEdited((prev) => !prev);
            handleModalClose();
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            const res = await fetch(`${API_URL}auth/v1/business/service-card/${cardId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete service');
            }

            setSuccessfullyEdited((prev) => !prev);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className='relative group mt-4 bg-gray-100 px-20'>
            <div className='text-center pt-10 '>
                {isMainEditing ? (
                    <div className="w-2/3 mx-auto">
                        <input
                            value={mainHeading}
                            onChange={(e) => setMainHeading(e.target.value)}
                            className="text-xl font-semibold border-b-2 border-blue-400 py-2 px-4 w-full"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-sm flex-grow break-words h-full w-full p-2 border rounded-md"
                            rows="5"
                        />
                        <div className="flex justify-center gap-2 mt-2">
                            <button onClick={handleMainCancel} className='bg-red-600 text-white rounded-md px-2 py-2'>Cancel</button>
                            <button onClick={handleMainSave} className='bg-green-600 text-white rounded-md px-2 py-2'>Save</button>
                        </div>
                    </div>
                ) : (
                    <div className="relative group">
                        <h1 className="text-2xl py-4 font-semibold font-sans text-black">{mainHeading}</h1>
                        <p>{description}</p>
                        <button onClick={handleMainEditClick} className="absolute top-0 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <MdEdit size={26} />
                        </button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mb-20 my-20">
                {services?.cardServiceData?.slice(0, showAll ? services.cardServiceData.length : 3).map((service) => (
                    <div key={service?._id} className="group relative flex flex-col py-10 rounded-xl border-2 hover:border-[#558BDC] hover:border-2 p-4 cursor-pointer min-h-full">
                        {editingId === service?._id ? (
                            <div>
                                <Image className="mb-4" alt={service?.cardTitle} src={service?.icon} width={50} height={50} onClick={() => inputRef.current.click()} />
                                <input
                                    value={service?.cardTitle}
                                    onChange={(e) => handleInputChange(e, service?._id, 'cardTitle')}
                                    className="text-xl font-semibold border-b-2 border-[#558BDC] py-2 w-full"
                                />
                                <input type='file' ref={inputRef} className='invisible' />
                            </div>
                        ) : (
                            <h1 className="border-b-2 border-[#558BDC] font-semibold text-2xl ">
                                <Image className="mb-4" alt={service?.cardTitle} src={service?.icon} width={50} height={50} />
                                <div className="pb-2">{service?.cardTitle}</div>
                            </h1>
                        )}
                        {editingId === service?._id ? (
                            <textarea
                                value={service?.cardDescription}
                                onChange={(e) => handleInputChange(e, service?._id, 'cardDescription')}
                                className="text-base flex-grow break-words h-full w-full p-2 border rounded-md"
                                rows="5"
                            />
                        ) : (
                            <p className="text-base text-bold mt-3 text-zinc-700 flex-grow break-words">{service?.cardDescription}</p>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => handleDeleteCard(service?._id)}>
                                <RxCross2 className="text-red-500" size={20} />
                            </button>
                        </div>
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {editingId === service?._id ? (
                                <div className="flex gap-2">
                                    <button onClick={() => handleCancelEdit()} className='bg-red-600 text-white rounded-md px-2 py-2 mt-4 '>Cancel</button>
                                    <button onClick={() => handleEditData(service?._id)} className='bg-green-600 text-white rounded-md px-2 py-2 mt-4 '>Save</button>
                                </div>
                            ) : (
                                <button onClick={() => handleEditClick(service?._id)}>
                                    <MdEdit size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-center pb-4'>
                {services?.cardServiceData?.length > 3 && (
                    <button onClick={() => setShowAll(!showAll)} className='bg-blue text-white py-1 px-4 text-lg rounded-lg'>
                        {showAll ? 'View Less' : 'Load More'}
                    </button>
                )}
            </div>
            <div className="absolute bottom-4 right-4">
                <button onClick={handleAddCardClick} className="bg-blue-600 text-white bg-green-500 font-bold rounded-xl px-6 py-2 shadow-lg">
                    Add
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl font-semibold mb-4">Add Card</h2>
                        <div>
                            <label className="block mb-2">Card Title</label>
                            <input
                                type="text"
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                className="border-b-2 border-blue-400 py-2 px-4 w-full mb-4"
                            />
                            <label className="block mb-2">Card Description</label>
                            <textarea
                                value={newCardDescription}
                                onChange={(e) => setNewCardDescription(e.target.value)}
                                className="border-b-2 border-blue-400 py-2 px-4 w-full mb-4"
                                rows="5"
                            />
                            <label className="block mb-2">Icon</label>
                            <input
                                type="file"
                                onChange={(e) => setNewCardIcon(e.target.files[0])}
                                className="mb-4"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleModalClose} className="bg-red-600 text-white rounded-md px-4 py-2">Cancel</button>
                            <button onClick={handleNewCardSave} className="bg-green-600 text-white rounded-md px-4 py-2">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesCard;



