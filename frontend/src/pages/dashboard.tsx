import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

// Dashboard component that renders the main page
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const { contents, loading, refresh } = useContent(); // Custom hook to fetch content

  // useEffect hook to refresh content when modalOpen state changes
  useEffect(() => {
    refresh(); // Refresh content when the modal opens
  }, [modalOpen]);

  return (
    <div>
      <Sidebar /> {/* Sidebar component for navigation */}
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)} // Open the modal
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              // Share brain content
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                { headers: { Authorization: localStorage.getItem("token") } }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        {/* Loading state */}
        {loading ? (
          <div>Loading content...</div> // Show loading message while fetching data
        ) : (
          <div className="flex gap-4 flex-wrap">
            {/* Check if contents have data */}
            {contents.length > 0 ? (
              contents.map(({ _id, type, link, title }) => (
                <Card
                  key={_id} // Unique key for each content card
                  type={type}
                  link={link}
                  title={title}
                />
              ))
            ) : (
              <div>No content available.</div> // Show message if no content
            )}
          </div>
        )}
      </div>
    </div>
  );
}
