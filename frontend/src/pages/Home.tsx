import { useState, useEffect } from "react";
import api from "../api";
import PortfolioItem from "../components/PortfolioItem";
//import "../styles/Home.css";

// Define types for Portfolio data
interface Portfolio {
  id: number;
  title: string;
  description: string;
  photo?: string | null;
  file?: string | null;
  created_at: string;
}

function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getPortfolios();
  }, []);

  const getPortfolios = () => {
    api
      .get("/server/portfolio/")
      .then((res) => res.data)
      .then((data: Portfolio[]) => {
        setPortfolios(data);
      })
      .catch((err) => alert(err));
  };

  const deletePortfolioItem = (id: number) => {
    api
      .delete(`/server/portfolio/delete/${id}/`)
      .then(() => {
        alert("Portfolio item deleted!");
        getPortfolios();
      })
      .catch((error) => alert(error));
  };

  const createPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);
    if (file) formData.append("file", file);

    api
      .post("/server/portfolio/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Portfolio item created!");
        getPortfolios();
        resetForm();
      })
      .catch((err) => alert(err));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPhoto(null);
    setFile(null);
  };

  return (
    <div>
      <div>
        <h2>Portfolios</h2>
        {portfolios.map((portfolio) => (
          <PortfolioItem
            portfolio={portfolio}
            onDelete={deletePortfolioItem}
            key={portfolio.id}
          />
        ))}
      </div>

      <h2>Create a Portfolio</h2>
      <form onSubmit={createPortfolioItem} encType="multipart/form-data">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <label htmlFor="photo">Upload Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
        />

        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
