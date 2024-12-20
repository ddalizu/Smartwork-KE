import React from "react";

// Define the type for props
interface Portfolio {
  id: number;
  title: string;
  description: string;
  photo?: string | null; // Path/URL to uploaded photo
  file?: string | null;  // Path/URL to uploaded file
  created_at: string;
}

interface PortfolioItemProps {
  portfolio: Portfolio;
  onDelete: (id: number) => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ portfolio, onDelete }) => {
  const formattedDate = new Date(portfolio.created_at).toLocaleDateString("en-US");

  return (
    <div className="portfolio-container">
      <p className="portfolio-title">{portfolio.title}</p>
      <p className="portfolio-description">{portfolio.description}</p>
      
      {portfolio.photo && (
        <img
          src={portfolio.photo}
          alt="Portfolio"
          className="portfolio-image"
          style={{ width: "100px", height: "100px" }} // Add a fixed size
        />
      )}
      
      {portfolio.file && (
        <p>
          File:{" "}
          <a href={portfolio.file} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </p>
      )}

      <p className="portfolio-date">Created on: {formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(portfolio.id)}>
        Delete
      </button>
    </div>
  );
};

export default PortfolioItem;
