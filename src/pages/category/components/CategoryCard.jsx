import axios from "axios";
import styles from "./CategoryCard.module.scss";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import Messages from "../../../components/Messages/Messages";

const CategoryCard = ({ category, setCategory }) => {
    const [editMode, setEditMode] = useState(null);
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const showTemporaryMessage = (msg, type) => {
      setMessage(msg);
      setMessageType(type);
      
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    };
  
    const startEditing = (cat) => {
      setEditMode(cat.codCategory);
      setNewName(cat.nameCategory);
    };
  
    const updateCategory = async (id) => {
      try {
        const apiURL = `http://localhost:8080/categories/${id}`;
        await axios.put(apiURL, { nameCategory: newName });

        setCategory(prevCategories => 
          prevCategories.map(cat => 
            cat.codCategory === id ? { ...cat, nameCategory: newName } : cat
          )
        );
        showTemporaryMessage("category updated successfully.", "success");
        setEditMode(null);
      } catch (error) {
        console.error("Error on update category:", error);
        const errorMessage = error.response?.data || "Error on update category";
        showTemporaryMessage(errorMessage, "error");
      }
    };
  
    const deleteCategory = async (id) => {
      try {
        const apiURL = `http://localhost:8080/categories/${id}`;
        await axios.delete(apiURL);
        
        setCategory((prevCategories) => 
          prevCategories.filter(cat => cat.codCategory !== id)
        );
        showTemporaryMessage("Category deleted successfully.", "success");
      } catch (error) {
        showTemporaryMessage(error.response?.data || "Error on connect to the Server", "error");
      }
    };
  
    const cancelEditing = () => {
      setEditMode(null);
      setNewName("");
    };
  
    return (
      <>
        <Messages type={messageType} message={message} />
        {category.map((cat) => (
          <article className={styles.card} key={cat.codCategory}>
            {editMode === cat.codCategory ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={styles["edit-input"]}
              />
            ) : (
              <p className={styles["card-title"]}>{cat.nameCategory}</p>
            )}

            <div className={styles["card-box-button"]}>
              {editMode === cat.codCategory ? (
                <>
                  <button onClick={() => updateCategory(cat.codCategory)}>
                    <Check size={20} className={styles["icon-success"]} />
                  </button>
                  <button onClick={cancelEditing}>
                    <X size={20} className={styles["icon-cancel"]} />
                  </button>
                </>
              ) : (
                <button onClick={() => startEditing(cat)}>
                  <Pencil size={20} className={styles["icon-edit"]} />
                </button>
              )}

              <button onClick={() => deleteCategory(cat.codCategory)}>
                <Trash2 size={20} className={styles["icon-delete"]} />
              </button>
            </div>
          </article>
        ))}
      </>
    );
  };

export default CategoryCard;
