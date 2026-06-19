import React, { useState } from 'react';
import Navbar2 from "../../components/Navbar2.tsx";
import TemplateCard from '../../components/TemplateCard.tsx';
import './Landing.css';
import { useNavigate } from "react-router-dom";

// Import your asset images and background video file
import bgVideo from '../../assets/background.mp4'; 
import blankImg from '../../assets/blanktemplate.jpg';
import temp1Img from '../../assets/bluewhitetemp.jpg';
import temp2Img from '../../assets/brownpurpletemp.jpg';
import temp3Img from '../../assets/circletemp.jpg';
import temp4Img from '../../assets/colourfultemp.jpg';
import temp5Img from '../../assets/greenbrowntemp.jpg';
import temp6Img from '../../assets/orangegreentemp.jpg';
import temp7Img from '../../assets/purplewhitetemp.jpg';
import temp8Img from '../../assets/shadesofbrowntemp.jpg';
import temp9Img from '../../assets/yellowwhitetemp.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Recents');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The base 6 templates shown directly on the landing page dashboard
  const primaryTemplates = [
    { id: 'blank', title: 'Blank Page', image: blankImg },
    { id: 'temp1', title: 'Template 1', image: temp1Img },
    { id: 'temp2', title: 'Template 2', image: temp2Img },
    { id: 'temp3', title: 'Template 3', image: temp3Img },
    { id: 'temp4', title: 'Template 4', image: temp4Img },
    { id: 'temp5', title: 'Template 5', image: temp5Img },
  ];

  // All 10 unique templates displayed inside the expanded modal grid overlay
  const modalTemplates = [
    ...primaryTemplates,
    { id: 'temp6', title: 'Template 6', image: temp6Img }, 
    { id: 'temp7', title: 'Template 7', image: temp7Img },
    { id: 'temp8', title: 'Template 8', image: temp8Img },
    { id: 'temp9', title: 'Template 9', image: temp9Img },
  ];

  const files = [
    { name: 'File 1', date: 'dd/mm/yy hh mm ss' },
    { name: 'File 2', date: 'dd/mm/yy hh mm ss' },
    { name: 'File 3', date: 'dd/mm/yy hh mm ss' },
    { name: 'File 4', date: 'dd/mm/yy hh mm ss' },
  ];

  return (
    <div className="landing-container">
        <Navbar2 />
      {/* --- LIVE MP4 BACKGROUND LAYER --- */}
      <div className="video-background-wrapper">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="bg-video"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark translucent tint overlay to protect typography contrast */}
        <div className="video-overlay-tint"></div>
      </div>

      <main className="landing-content">
        <div className="section-header">
          <h2>CREATE NEW MAP</h2>
          <button className="more-templates-btn" onClick={() => setIsModalOpen(true)}>
            More Templates <span className="arrow">→</span>
          </button>
        </div>

        <div className="templates-grid">
          {primaryTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate("/workspace")}
              style={{ cursor: "pointer" }}
            >
              <TemplateCard 
                key={template.id} 
                title={template.title} 
                image={template.image} 
              />
          </div>
          ))}
        </div>

        <div className="files-section">
          <div className="tab-navigation">
            {['Recents', 'Open existing', 'Shared'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="files-table-container">
            <table className="files-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Accessed on</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- MORE TEMPLATES MODAL Overlay --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ALL TEMPLATES</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <div className="modal-grid">
  {modalTemplates.map((template) => (
    <div
      key={`modal-${template.id}`}
      onClick={() => navigate("/workspace")}
      style={{ cursor: "pointer" }}
    >
      <TemplateCard
        title={template.title}
        image={template.image}
      />
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