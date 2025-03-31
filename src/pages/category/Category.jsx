import axios from "axios";
import { useState, useEffect } from "react";
import Messages from "../../components/Messages";
import CategoryCard from "./components/CategoryCard";

export default function Category() {
  const apiURL = "http://localhost:8080/categories";

  const [nameCategory, setNameCategory] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [category, setCategory] = useState([]);

  const showTemporaryMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const getCategories = async () => {
    const dataCategory = await axios.get(apiURL);
    setCategory(dataCategory.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const captureNameCategory = (e) => {
    setNameCategory(e.target.value);
  };

  const cleanFields = () => {
    setNameCategory("");
  };

  const createCategory = async () => {
    try {
      const dataSend = {
        nameCategory
      };

      await axios.post(apiURL, dataSend);
      cleanFields();
      showTemporaryMessage("Category created.", "success");
      getCategories();
    } catch (error) {
      if (error.response) {
        showTemporaryMessage(error.response.data || "Unknown Error", "error");
      } else {
        showTemporaryMessage("Error to connect Server", "error");
      }
    }
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="category description"
          value={nameCategory}
          onChange={captureNameCategory}
        />
        <input type="submit" value="submit" onClick={createCategory} />
        <Messages type={messageType} message={message} /> {/* Exibe a mensagem */}
      </form>
      <CategoryCard category={category} setCategory={setCategory}/>
    </main>
  );
}
