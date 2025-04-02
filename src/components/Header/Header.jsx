import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header(){


    return <header className={styles.header}>
        <section className={styles.logo}>
                <article>
                    <img src="https://cdn-icons-png.flaticon.com/512/3789/3789946.png" alt="ícone de uma todoList" />
                    <h1> ToDoList </h1>
                </article>
                <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category">Categories</Link></li>
                <li><Link to="/task">Task Board</Link></li>
                </ul>
            </nav>
        </section>  

        <section className={styles.teste}>

        </section>
    </header>
}