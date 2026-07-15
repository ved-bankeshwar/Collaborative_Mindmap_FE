import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar2 from "../../components/Navbar2";
import TemplateCard from "../../components/TemplateCard";
import bgVideo from "../../assets/videos/bgvideo.mp4";
import api from "../../api/api"; // Your configured Axios instance

import blankImg from "../../assets/blanktemplate.jpg";
import temp1Img from "../../assets/bluewhitetemp.jpg";
import temp2Img from "../../assets/brownpurpletemp.jpg";
import temp3Img from "../../assets/circletemp.jpg";
import temp4Img from "../../assets/colourfultemp.jpg";
import temp5Img from "../../assets/greenbrowntemp.jpg";
import temp6Img from "../../assets/orangegreentemp.jpg";
import temp7Img from "../../assets/purplewhitetemp.jpg";
import temp8Img from "../../assets/shadesofbrowntemp.jpg";
import temp9Img from "../../assets/yellowwhitetemp.jpg";

type Template = {
  id: string;
  title: string;
  image: string;
};

type MindMap = {
  id: string;
  title: string;
  "owner id"?: string; // Matches backend documentation naming
  owner_id?: string;
  collaborators_array: string[];
  created_at: string;
};

const Landing = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("Recents");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [maps, setMaps] = useState<MindMap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const primaryTemplates: Template[] = [
    { id: "blank", title: "Blank Page", image: blankImg },
    { id: "temp1", title: "Template 1", image: temp1Img },
    { id: "temp2", title: "Template 2", image: temp2Img },
    { id: "temp3", title: "Template 3", image: temp3Img },
    { id: "temp4", title: "Template 4", image: temp4Img },
    { id: "temp5", title: "Template 5", image: temp5Img },
  ];

  const modalTemplates: Template[] = [
    ...primaryTemplates,
    { id: "temp6", title: "Template 6", image: temp6Img },
    { id: "temp7", title: "Template 7", image: temp7Img },
    { id: "temp8", title: "Template 8", image: temp8Img },
    { id: "temp9", title: "Template 9", image: temp9Img },
  ];

  useEffect(() => {
    const fetchMaps = async () => {
      // 1. Grab the small token string out of localStorage
      const token = localStorage.getItem("token");
      
      // If there is no token at all, they aren't logged in, send them away!
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        
        // 2. Hand the token over to the backend so it knows who you are
        const response = await api.get("/maps", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setMaps(response.data.maps || []);
      } catch (err: any) {
        console.error("Failed to fetch maps:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login"); // Token expired or invalid, re-authenticate
        } else {
          setError("Could not load your mind maps. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, [navigate]);

  const handleCreateMap = async (templateTitle: string) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const payload = {
        title: `${templateTitle} - ${new Date().toLocaleDateString()}`,
        collaborators_array: [],
        collaborator_roles: {},
      };

      // 3. Send token to create a new map securely on the backend
      const response = await api.post("/maps", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const createdMap = response.data.map;
      setIsModalOpen(false);
      
      // Navigate cleanly to the specific workspace ID returned by your live database
      navigate(`/workspace/${createdMap.id}`);
    } catch (err: any) {
      console.error("Failed to create map:", err);
      alert(err.response?.data?.message || "Failed to create mind map");
    }
  };

  // Dynamically segment data categories strictly using backend fields
  const getFilteredMaps = () => {
    const localUserStr = localStorage.getItem("user");
    if (!localUserStr) return [];
    
    const loggedInUser = JSON.parse(localUserStr);
    const userId = loggedInUser.id;

    switch (activeTab) {
      case "Recents":
        return [...maps].sort((a, b) => {
          const dateAStr = a.title.split(" - ")[1] || a.created_at;
          const dateBStr = b.title.split(" - ")[1] || b.created_at;
          const timeA = dateAStr ? new Date(dateAStr).getTime() : 0;
          const timeB = dateBStr ? new Date(dateBStr).getTime() : 0;
          return timeB - timeA;
        });
      
      case "Open existing":
        return maps.filter((map) => map.owner_id === userId || map["owner id"] === userId);
      
      case "Shared":
        return maps.filter((map) => map.collaborators_array?.includes(userId));
      
      default:
        return maps;
    }
  };

  const filteredFiles = getFilteredMaps();

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleString();
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-inter text-white">
      
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video src={bgVideo} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar2 />

        <main className="mx-auto max-w-[1200px] px-5 py-[clamp(20px,4vw,40px)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-wide">CREATE NEW MAP</h2>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 whitespace-nowrap text-[clamp(0.85rem,2vw,1rem)] transition-opacity hover:opacity-80">
              More Templates <span>→</span>
            </button>
          </div>

          {/* Templates Grid */}
          <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(15px,3vw,30px)]">
            {primaryTemplates.map((template) => (
              <div key={template.id} onClick={() => handleCreateMap(template.title)} className="cursor-pointer">
                <TemplateCard title={template.title} image={template.image} />
              </div>
            ))}
          </div>

          {/* Files Section */}
          <div className="mt-[clamp(40px,6vw,70px)]">
            <div className="mb-[35px] flex flex-wrap gap-[clamp(20px,4vw,48px)]">
              {["Recents", "Open existing", "Shared"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-6 py-2.5 font-medium transition-all duration-200 ${
                    activeTab === tab ? "bg-white text-black" : "bg-[#f3e8eb] text-[#111] hover:opacity-90"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="w-full max-w-[800px] overflow-x-auto py-2">
              {loading ? (
                <p className="text-gray-400 text-lg">Loading your mind maps...</p>
              ) : error ? (
                <p className="text-red-400 text-lg">{error}</p>
              ) : filteredFiles.length === 0 ? (
                <p className="text-gray-400 text-lg">No maps found matching this category.</p>
              ) : (
                <table className="min-w-[500px] w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-white/15 py-4 text-[1.05rem] font-semibold text-[#a0a5b5]">Name</th>
                      <th className="border-b border-white/15 py-4 text-[1.05rem] font-semibold text-[#a0a5b5]">Last Accessed on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((map) => {
                      const parts = map.title.split(" - ");
                      const displayName = parts[0];
                      const dateDisplay = parts[1] || formatDate(map.created_at) || "N/A";
                      return (
                        <tr key={map.id} onClick={() => navigate(`/workspace/${map.id}`)} className="cursor-pointer transition-colors hover:text-[#e2cad1]">
                          <td className="border-b border-white/5 py-5 text-[1.1rem]">{displayName}</td>
                          <td className="border-b border-white/5 py-5 text-[1.1rem]">{dateDisplay}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-5 backdrop-blur-md">
          <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] w-full max-w-[1000px] overflow-y-auto rounded-xl border border-white/10 bg-[#13141c] p-[clamp(20px,4vw,35px)] shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl tracking-wide">ALL TEMPLATES</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-4xl leading-none text-[#888] transition-colors hover:text-white">×</button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {modalTemplates.map((template) => (
                <div key={`modal-${template.id}`} onClick={() => handleCreateMap(template.title)} className="cursor-pointer">
                  <TemplateCard title={template.title} image={template.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;