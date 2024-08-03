import React ,{useState}from 'react'
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMeta } from "react-icons/fa6";
import { API_URL } from "@/api/commonApi";

const AddSlugModal = ({setIsAddModalOpen,pageName,setData}) => {
    const [newServiceName, setNewServiceName] = useState("");
    const [newSlugName, setNewSlugName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const refreshData = async () => {
        const res = await fetch(`${API_URL}auth/v1/${pageName}/category`);
        const newData = await res.json();
        setData(newData.data || []);
        // console.log(newData,"newData")
      };
    const handleAddService = async () => {
        if (!newServiceName || !newSlugName) {
            setError("Both fields are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}auth/v1/business/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    servicesName: newServiceName,
                    slugName: newSlugName,
                }),
            });

            if (res.status === 200) {
                setIsAddModalOpen(false);
                setNewServiceName("");
                setNewSlugName("");
                refreshData();
            } else {
                console.error("Failed to add service");
                setError("Failed to add service. Please try again.");
            }
        } catch (err) {
            console.error("Failed to add service", err);
            setError("Failed to add service. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.66)] flex items-center justify-center">
                <div className="bg-white p-4 rounded-md w-[300px] relative">
                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        className="absolute top-2 right-2 text-black"
                    >
                        <AiOutlineClose size={25} />
                    </button>
                    <h2 className="text-lg font-bold my-4">Add Service</h2>
                    <input
                        type="text"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        className="border-2 p-2 w-full mb-4"
                        placeholder="Enter service name"
                    />
                    <input
                        type="text"
                        value={newSlugName}
                        onChange={(e) => setNewSlugName(e.target.value)}
                        className="border-2 p-2 w-full mb-4"
                        placeholder="Enter slug name"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        onClick={handleAddService}
                        className={`bg-[#521950] text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddSlugModal